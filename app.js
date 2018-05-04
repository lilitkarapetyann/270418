var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Grass = require('./class.grass')
var Eater = require('./class.grassEater')
var Fire = require('./class.fire')
var w = 15;
var h = 10;
matrix = randMatrix(w, h);
global.grassArr = [];
global.eaterArr = [];
global.fireArr = [];
app.use(express.static("./public"));
app.get('/', function (req, res) {
  res.redirect('index.html');
});

http.listen(3000, function () {
  console.log("3000")
});
for (var y = 0; y < global.matrix.length; y++) {
        for (var x = 0; x < global.matrix[0].length; x++) {
            if (global.matrix[y][x] == 1)
                global.grassArr.push(new Grass(x, y));
            else if (global.matrix[y][x] == 2)
                global.eaterArr.push(new Eater(x, y));
        }
    }
io.on('connection', function (socket) {
  setInterval(function () {
    if (global.fireArr.length < 1) {
      var temp;
      if (global.eaterArr.length > global.grassArr.length / 3) {
        temp = global.eaterArr[Math.floor(Math.random(global.eaterArr.length))]
        global.fireArr.push(new Fire(temp.x, temp.y));
      }
      else if (global.eaterArr.length < global.grassArr.length * 4) {
        temp = global.grassArr[Math.floor(Math.random(global.grassArr.length))]
        global.fireArr.push(new Fire(temp.x, temp.y));
      }
    }

    for (var i in global.grassArr) {
      global.grassArr[i].mul();
    }

    for (var i in global.eaterArr) {
      global.eaterArr[i].directions = global.eaterArr[i].directionMaker(1)
      global.eaterArr[i].mul();
      global.eaterArr[i].move();
      global.eaterArr[i].eat();
      global.eaterArr[i].die();
    }

    for (var i in global.fireArr) {
      if (global.fireArr.length > 0) {
        if (global.eaterArr.length == 0 || global.grassArr.length == 0)
          global.fireArr[i].maxN = w >= h ? w : h;
        global.fireArr[i].multiply++;
        global.fireArr[i].burn(global.grassArr);
        global.fireArr[i].burn(global.eaterArr);
        global.fireArr[i].body = global.fireArr[i].grow();
        if (global.eaterArr.length == 0 && global.grassArr.length == 0)
          global.fireArr[i].die(global.fireArr[i].maxN);
      }
    }
    socket.emit('matrix', global.matrix);

  }, 100);
});


function randMatrix(w, h, num = 2) {
  var matrix = [];
  for (var i = 0; i < h; i++) {
    matrix[i] = [];
    for (var j = 0; j < w; j++) {
      matrix[i][j] = Math.round(Math.random() * num);
    }
  }
  return matrix;
}