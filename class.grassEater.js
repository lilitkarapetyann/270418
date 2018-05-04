var Parent = require('./class.parent')
module.exports = class Eater extends Parent {
    constructor(x, y) {
        super(x, y);
        this.energy = 2;
        this.step = 0;
    }

    eat() {
        for (var j in global.eaterArr) {
            for (var i in global.grassArr) {
                if (global.grassArr[i].x == global.eaterArr[j].x && global.grassArr[i].y == global.eaterArr[j].y) {
                    global.grassArr.splice(i, 1);
                    if (this.energy < 3)
                        this.energy++;
                    global.matrix[global.eaterArr[j].y][global.eaterArr[j].x] = 2;
                }
            }
        }
    }

    die() {
        if (this.energy == 0) {
            for (var k in global.eaterArr) {
                if (global.eaterArr[k].x == this.x && global.eaterArr[k].y == this.y) {
                    global.eaterArr.splice(k, 1);
                    global.matrix[this.y][this.x] = 0;
                    break;
                }
            }
        }
    }



    move() {
        var tempArr;
        this.step++

        if (this.yntrelVandak(1).length > 0) {
            tempArr = this.yntrelVandak(1)[Math.floor(Math.random(this.yntrelVandak(1).length))];
        }
        else {
            tempArr = this.yntrelVandak(0)[Math.floor(Math.random(this.yntrelVandak(0).length))];
        }

        if (tempArr) {
            if (tempArr[0] >= 0 && tempArr[0] < global.matrix[0].length && tempArr[1] >= 0 && tempArr[1] < global.matrix.length) {
                this.energy--;
                global.matrix[this.y][this.x] = 0;
                global.matrix[tempArr[1]][tempArr[0]] = 2;
                this.x = tempArr[0];
                this.y = tempArr[1];
            }
        }
    }



    mul() {
        this.multiply++;
        var temp, norVandak;
        if (this.multiply >= 5) {
            if (this.yntrelVandak(1).length != 0) {
                temp = this.yntrelVandak(1);
            }
            else {
                temp = this.yntrelVandak(0);
            }

            norVandak = temp[Math.floor(Math.random(temp.length))];
            if (norVandak) {
                global.matrix[norVandak[1]][norVandak[0]] = 2;
                global.eaterArr.push(new Eater(norVandak[0], norVandak[1]));
                this.multiply = 0;
            }
        }
    }
}
