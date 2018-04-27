class Eater extends Parent {
    constructor(x, y) {
        super(x, y);
        this.energy = 5;
    }

    eat() {
        for (var j in eaterArr) {
            for (var i in grassArr) {
                if (grassArr[i].x == eaterArr[j].x && grassArr[i].y == eaterArr[j].y) {
                    grassArr.splice(i, 1);
                    if (this.energy <= 5)
                        this.energy++;
                    matrix[eaterArr[j].y][eaterArr[j].x] = 2;
                }
            }
        }
    }

    die() {
        if (this.energy == 0) {
            for (var k in eaterArr) {
                if (eaterArr[k].x == this.x && eaterArr[k].y == this.y) {
                    eaterArr.splice(k, 1);
                    matrix[this.y][this.x] = 0;
                    break;
                }
            }
        }
    }



    move() {
        var tempArr;

        if (this.yntrelVandak(1).length > 0) {
            tempArr = random(this.yntrelVandak(1));
        }
        else {
            tempArr = random(this.yntrelVandak(0));
        }

        if (tempArr) {
            if (tempArr[0] >= 0 && tempArr[0] < matrix[0].length && tempArr[1] >= 0 && tempArr[1] < matrix.length) {
                this.energy--;
                matrix[this.y][this.x] = 0;
                matrix[tempArr[1]][tempArr[0]] = 2;
                this.x = tempArr[0];
                this.y = tempArr[1];
            }
        }
    }



    mul() {
        this.multiply++;
        var temp, norVandak;
        if (this.multiply >= 7) {
            if (this.yntrelVandak(1).length != 0) {
                temp = this.yntrelVandak(1);
            }
            else {
                temp = this.yntrelVandak(0);
            }

            norVandak = random(temp);
            if (norVandak) {
                matrix[norVandak[1]][norVandak[0]] = 2;
                eaterArr.push(new Eater(norVandak[0], norVandak[1]));
                //this.utel();
                this.multiply = 0;
            }
        }
    }
}
