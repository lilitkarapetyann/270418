var matrix = [];
var side = 40;
var grassArr = [];
var eaterArr = [];
var fireArr = [];

for (var i = 0; i < 10; i++) {
    matrix[i] = [];
    for (var j = 0; j < 15; j++) {
        matrix[i][j] = 0;
    }
}
function setup() {
    for (var k = 0; k < 70; k++) {
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
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
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
    
    if ((eaterArr.length > grassArr.length / 3 || eaterArr.length < grassArr.length * 4)&& fireArr.length < 1) {
        fireArr.push(new Fire(Math.floor(random(0 + 2, matrix[0].length - 2)), Math.floor(random(0 + 2, matrix.length - 2))));
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
            fireArr[i].multiply++;
            fireArr[i].burn(grassArr);
            fireArr[i].burn(eaterArr);
            fireArr[i].body = fireArr[i].grow();
        }
    }
}
