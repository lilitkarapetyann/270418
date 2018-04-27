var matrix = [];
var side = 40;
var grassArr = [];
var eaterArr = [];
var fireArr = [];

for (var i = 0; i < 15; i++) {
    matrix[i] = [];
    for (var j = 0; j < 25; j++) {
        matrix[i][j] = 0;
    }
}
function setup() {
    for (var k = 0; k < 300; k++) {
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

    if (eaterArr.length > grassArr.length / 3 && fireArr.length < 1) {
        fireArr.push(new Fire(Math.floor(random(0 + 2, matrix[0].length - 2)), Math.floor(random(0 + 2, matrix.length - 2))));
    }

    for (var i in fireArr) {
        // console.log(fireArr[i].multiply);
        if (fireArr.length > 0) {
            fireArr[i].multiply++;
            fireArr[i].burn();
            fireArr[i].body = fireArr[i].grow();
        }
    }
    /*if (eaterArr.length > 10 && predLife) {
        if (matrix[Math.floor(matrix.length / 2)][Math.floor(matrix[0].length / 2)] == 1) {
            for (var i in grassArr) {
                if (grassArr[i].x == Math.floor(matrix[0].length / 2) && grassArr[i].y == Math.floor(matrix.length / 2)) {
                    grassArr.splice(i, 1);
                }
            }
        }
        else if (matrix[Math.floor(matrix.length / 2)][Math.floor(matrix[0].length / 2)] == 2) {
            for (var i in eaterArr) {
                if (eaterArr[i].x == Math.floor(matrix[0].length / 2) && eaterArr[i].y == Math.floor(matrix.length / 2)) {
                    eaterArr.splice(i, 1);
                }
            }
        }

        matrix[Math.floor(matrix.length / 2)][Math.floor(matrix[0].length / 2)] = 3;
        predArr.push(new Predator(Math.floor(matrix[0].length / 2), Math.floor(matrix.length / 2)));
        predLife = false
    }
    else if (eaterArr.length == 0) {
        while (predArr.length > 0) {
            matrix[predArr[predArr.length - 1].y][predArr[predArr.length - 1].x] = 0;
            predArr.splice(predArr.length - 1, 1)
        }
    }

    for (var i in predArr) {
        predArr[i].move()
        predArr[i].eat();
    }*/
}
