class Predator extends Parent {
    constructor(x, y) {
        super(x, y);
        this.directions = this.directionMaker(2)
    }

    move() {
        var tempArr;

        if (this.yntrelVandak(2).length > 0) {
            tempArr = random(this.yntrelVandak(2));
        }
        else {
            tempArr = random(this.yntrelVandak(0));
        }

        if (tempArr) {
            if (tempArr[0] >= 0 && tempArr[0] < matrix[0].length && tempArr[1] >= 0 && tempArr[1] < matrix.length) {
                matrix[this.y][this.x] = 0;
                matrix[tempArr[1]][tempArr[0]] = 3;
                this.x = tempArr[0];
                this.y = tempArr[1];
            }
        }
    }
    eat() {
        for (var j in eaterArr) {
            for (var i in predArr) {
                if (predArr[i].x == eaterArr[j].x && predArr[i].y == eaterArr[j].y) {
                    eaterArr.splice(j, 1);
                    matrix[predArr[i].y][predArr[i].x] = 3;
                }
            }
        }
    }

}
