var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs')
var Grass = require('./class.grass');
var Eater = require('./class.grassEater');
var Fire = require('./class.fire');
var w = 25;
var h = 20;
var frameCounter = 0;
global.weather = 1;// 0:winter, 1:spring, 2:summer, 3:fall
global.matrix = randMatrix(w, h);
global.grassArr = [];
global.eaterArr = [];
global.fireArr = [];
global.rainArr = [];
var lgtning, stat;
global.maleEater = 0;
global.femaleEater = 0;
app.use(express.static("./public"));
app.get('/', function (req, res) {
  res.redirect('index.html');
});

http.listen(3000, function () {
  //console.log("3000");
});


for (var y = 0; y < global.matrix.length; y++) {
  for (var x = 0; x < global.matrix[0].length; x++) {
    if (global.matrix[y][x] == 1)
      global.grassArr.push(new Grass(x, y));
    else if (global.matrix[y][x] == 2) {
      var rand = (Math.round(Math.random())) / 2;
      global.eaterArr.push(new Eater(x, y, rand));
      global.matrix[y][x] += rand;
    }
  }
}


io.on('connection', function (socket) {
  setInterval(function () {
    frameCounter++;

    if (frameCounter % 10 == 0) {
      if (frameCounter % 1 == 0) {
        updateStats();
        stat = {
          'eater': global.eaterArr.length,
          'male': global.maleEater,
          'female': global.femaleEater,
          'grass': global.grassArr.length,
          'rain': rainArr.length ? true : false
        }
          fs.writeFileSync('statistics.json', JSON.stringify(stat), 'utf8', (err) => {
            if (err) throw err;
            console.log('Written');
          });
      }
      global.weather++;
      global.weather %= 4;
    }

    if (global.weather == 1 || global.weather == 3) {

      for (var i = 0; i < 5; i++) {
        y = Math.floor(Math.random() * global.matrix.length);
        x = Math.floor(Math.random() * global.matrix[y].length);
        global.rainArr.push({ x: x, y: y })
        global.matrix[y][x] = global.matrix[y][x].toString();
      }
      if (!(lgtning) && global.fireArr.length < 1) {
        var temp;

        if (global.eaterArr.length > global.grassArr.length / 3) {
          temp = global.eaterArr[Math.floor(Math.random() * global.eaterArr.length)]
          global.fireArr.push(new Fire(temp.x, temp.y));
        }
        else if (global.eaterArr.length < global.grassArr.length * 4) {
          temp = global.grassArr[Math.floor(Math.random() * global.grassArr.length)]
          global.fireArr.push(new Fire(temp.x, temp.y));
        }
        if (temp && temp.x && temp.y)
          lgtning = { x: temp.x, y: temp.y };
      }

    }
    else {

      for (var i = 0; i < global.rainArr.length; i++) {
        global.matrix[global.rainArr[i].y][global.rainArr[i].x] *= 1;
      }

      global.rainArr = [];
      lgtning = null;
    }

    for (var i in global.grassArr) {
      for (var j in global.rainArr) {
        if (global.grassArr[i].x == global.rainArr[j].x && global.grassArr[i].y == global.rainArr[j].y) {
          global.grassArr[i].multiply = 3;
        }
      }
      global.grassArr[i].mul();
    }

    for (var i in global.eaterArr) {
      global.eaterArr[i].directions = global.eaterArr[i].directionMaker(1);
      for (var j in global.rainArr) {
        if (global.eaterArr[i].x == global.rainArr[j].x && global.eaterArr[i].y == global.rainArr[j].y) {
          global.eaterArr[i].energy--;
        }
      }
      if (global.eaterArr[i].mf > 0)
        global.eaterArr[i].mul();
      global.eaterArr[i].move();
      global.eaterArr[i].eat();
      if (global.eaterArr[i].energy == 0)
        global.eaterArr[i].die();
    }

    for (var i in global.fireArr) {

      if (global.eaterArr.length == 0 || global.grassArr.length == 0)
        global.fireArr[i].maxN = w >= h ? w : h;
      global.fireArr[i].multiply++;
      global.fireArr[i].burn(global.grassArr);
      global.fireArr[i].burn(global.eaterArr);
      global.fireArr[i].body = global.fireArr[i].grow();
      if (global.eaterArr.length == 0 && global.grassArr.length == 0)
        global.fireArr[i].die(global.fireArr[i].maxN);
    }
    try {
      socket.emit('weather', global.weather)
    } catch (e) {
      console.log("error weather", e)
    }
    try {
      socket.emit('matrix', global.matrix);
    } catch (e) {
      console.log("error matrix", e)
    }
    try {
      socket.emit('lightening', lgtning)
    } catch (e) {
      console.log("error lightening", e)
    }
  }, 500);
});


function randMatrix(w, h) {
  var matrix = [];

  for (var i = 0; i < h; i++) {
    matrix[i] = [];
    for (var j = 0; j < w; j++) {
      matrix[i][j] = 0
    }
  }

  for (var i = 0; i < w * h / 2; i++) {
    var randX = Math.floor(Math.random() * matrix[0].length);
    var randY = Math.floor(Math.random() * matrix.length);

    if (i < 25)
      matrix[randY][randX] = 2
    else
      matrix[randY][randX] = 1
  }

  return matrix;
}




function updateStats() {
  global.maleEater = 0;
  global.femaleEater = 0;
  for(let y in matrix) {
    for(let x in matrix[y]) {
      if(matrix[y][x] == 2) {
        global.maleEater++;
      }
      if(matrix[y][x] == 2.5) {
        global.femaleEater++;
      }
    }
  }
}