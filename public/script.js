var w = 25; // w > 7, w >= h
var h = 20; // h > 7
var side = 35;
var socket = io.connect('http://localhost:3000');
var weather = ['Winter', 'Spring', 'Summer', 'Fall']
var currentWeather, matrix;
var lighteningArr = [];
function setup() {
    createCanvas(w * side, h * side);
    background('#acacac');
}
socket.on('weather', function (data) {
    var h1 = document.getElementById('weather');
    h1.innerHTML = weather[data];
    currentWeather = data;
});
socket.on('rain', function (data) {

});
socket.on('matrix', function (data) {
    background("#acacac")
    matrix = data;
    //console.log(currentWeather)
    stroke(0, 0, 0)
    strokeWeight(1)
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            stroke(0, 0, 0)
            strokeWeight(1)
            if (matrix[y][x] == 1) {
                if (currentWeather == 0)
                    fill("#d6f2ff");
                else if (currentWeather == 3)
                    fill("#ffc35b");
                else
                    fill("#47a840");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == Math.floor(2)) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            rect(x * side, y * side, side, side);
            if (typeof matrix[y][x] == typeof 'string') {
                noStroke();
                fill('#72d9ff')
                ellipse(x * side + side / 2, y * side + side / 2, 10, 10)

            }

            if (currentWeather == 1 || currentWeather == 3) {
                if (lighteningArr.length < 3) {
                    //console.log(lighteningArr.length)
                    var ly = Math.floor(Math.random() * matrix.length)
                    var lx = Math.floor(Math.random() * matrix[y].length)
                    // console.log(x)
                    lighteningArr.push({ x: lx, y: ly });
                }
            }
            else {
                lighteningArr = [];
            }

        }
        for (var l = 0; l < lighteningArr.length; l++) {
            lightening(lighteningArr[l].x * side + 10, lighteningArr[l].y * side + 10);
        }
    }

    /*if (currentWeather == 1 || currentWeather == 3) {
        noStroke();
        fill('#72d9ff')
        //rain(side)
        console.log()
    }*/

});


/*function rain(side){
    var x,y
    for(var i = 0; i < 20; i++)
    {
        x = Math.floor(random(0,matrix.length)*side - Math.floor(side/2));
        y = Math.floor(random(0,matrix[0].length)*side - Math.floor(side/2));
        console.log(x,y)
        ellipse(x , y , 10,10)
    }
    
}*/

function lightening(x, y) {
    strokeWeight(5)
    stroke(255, 255, 0)
    line(x, 0, x - 60, y / 3);
    strokeWeight(4)
    line(x - 60, y / 3, x + 60, y / 3 * 2);
    strokeWeight(3)
    line(x + 60, y / 3 * 2, x, y);
}