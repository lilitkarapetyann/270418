class Fire extends Parent {
    constructor(x, y) {
        super(x, y);
        this.n = 0;
        this.body = this.grow();
        delete this.directions;
    }

    grow() {
        var tempArr = []

        if (this.multiply >= 3 && this.n < 3) {
            this.n++
            this.multiply = 0;
        }

        if (this.n >= 3) {
            this.die();
        }
        else {
            for (var i = -this.n; i <= this.n; i++) {
                for (var j = -this.n; j <= this.n; j++) {
                    tempArr.push([this.x + i, this.y + j]);
                    matrix[this.y + j][this.x + i] = 3;
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
                        array.splice(a, 1);
                        a--;
                    }

                }
            }
        }


    }

    die() {
        for (var k in fireArr) {
            if (fireArr[k].x == this.x && fireArr[k].y == this.y) {
                for (var i = -this.n + 1; i <= this.n - 1; i++) {
                    for (var j = -this.n + 1; j <= this.n - 1; j++) {
                        matrix[this.y + j][this.x + i] = 0;
                    }
                }
                fireArr.splice(k, 1);
                break;
            }
        }
    }
}
