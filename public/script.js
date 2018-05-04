/*var matrix = [];
var side = 35;
var grassArr = [];
var eaterArr = [];
var fireArr = [];
var w = 15; // w > 7, w >= h
var h = 10; // h > 7
for (var i = 0; i < h; i++) {
    matrix[i] = [];
    for (var j = 0; j < w; j++) {
        matrix[i][j] = 0;
    }
}
function setup() {
    for (var k = 0; k < w * h / 2; k++) {
        var x = Math.floor(random(0, matrix[0].length));
        var y = Math.floor(random(0, matrix.length));
        if (k % 10 == 0)
            matrix[y][x] = 2;
        else
            matrix[y][x] = 1;
    }


    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    frameRate(5);
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[0].length; x++) {
            if (matrix[y][x] == 1)
                grassArr.push(new Grass(x, y));
            else if (matrix[y][x] == 2)
                eaterArr.push(new Eater(x, y));
        }
    }
}


function draw() {
    //noStroke()
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("#47a840");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
        }
    }

    if (fireArr.length < 1) {
        var temp;
        if (eaterArr.length > grassArr.length / 3) {
            temp = random(eaterArr)
            fireArr.push(new Fire(temp.x, temp.y));
        }
        else if (eaterArr.length < grassArr.length * 4) {
            temp = random(grassArr)
            fireArr.push(new Fire(temp.x, temp.y));
        }
    }

    for (var i in grassArr) {
        grassArr[i].mul();
    }

    for (var i in eaterArr) {
        eaterArr[i].directions = eaterArr[i].directionMaker(1)
        eaterArr[i].mul();
        eaterArr[i].move();
        eaterArr[i].eat();
        eaterArr[i].die();
    }

    for (var i in fireArr) {
        if (fireArr.length > 0) {
            if (eaterArr.length == 0 || grassArr.length == 0)
                fireArr[i].maxN = w>=h? w : h ;
            fireArr[i].multiply++;
            fireArr[i].burn(grassArr);
            fireArr[i].burn(eaterArr);
            fireArr[i].body = fireArr[i].grow();
            if (eaterArr.length == 0 && grassArr.length == 0)
                fireArr[i].die(fireArr[i].maxN);
        }
    }
}
*/
var w = 15; // w > 7, w >= h
var h = 10; // h > 7
var side = 35;
var socket = io.connect('http://localhost:3000');

function setup() {
    createCanvas(w * side, h * side);
    background('#acacac');
}


socket.on('matrix', function (data) {
    background("#acacac")
    var matrix = data;
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("#47a840");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            rect(x * side, y * side, side, side);
        }
    }

});