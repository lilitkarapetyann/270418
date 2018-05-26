var Parent = require('./class.parent')

module.exports = class Fire extends Parent {
    constructor(x, y) {
        super(x, y);
        this.n = 0;
        this.maxN = 3;
        this.body = this.grow();
        delete this.directions;
    }

    grow() {
        var tempArr = []
        if (this.multiply >= 3 && this.n < this.maxN) {
            this.n++
            this.multiply = 0;
        }

        if (this.n >= this.maxN) {
            this.die(this.n);
        }
        else {
            for (var i = -this.n; i <= this.n; i++) {
                for (var j = -this.n; j <= this.n; j++) {
                    if (this.y + j < global.matrix.length && this.y + j >= 0 && this.x + i < global.matrix[0].length && this.x + i >= 0) {
                        tempArr.push([this.x + i, this.y + j]);
                        global.matrix[this.y + j][this.x + i] = 3;
                    }
                }
            }
            return tempArr;
        }
    }

    burn(array) {
        for (var a = 0; a < array.length; a++) {
            for (var i = 0; i < this.body.length; i++) {
                if (array[a]) {
                    if (array[a].x == this.body[i][0] && array[a].y == this.body[i][1]) {
                        if (global.matrix[array[a].y][array[a].x] == 2.5) { 
                            // global.femaleEater--;
                        }
                        else if (global.matrix[array[a].y][array[a].x] == 2) {
                            // global.maleEater--;
                        }
                        array.splice(a, 1);
                        a--;
                    }

                }
            }
        }


    }

    die(n) {
        for (var k in global.fireArr) {
            if (global.fireArr[k].x == this.x && global.fireArr[k].y == this.y) {
                for (var i = -n + 1; i <= n - 1; i++) {
                    for (var j = -n + 1; j <= n - 1; j++) {
                        if (this.y + j < global.matrix.length && this.y + j >= 0 && this.y + j < global.matrix[0].length && this.y + j >= 0) {
                            global.matrix[this.y + j][this.x + i] = 0;
                        }
                    }
                }
                global.fireArr.splice(k, 1);
                break;
            }
        }
    }
}
