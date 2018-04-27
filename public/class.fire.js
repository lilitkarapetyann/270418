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

    burn() {
        for (var g = 0; g < grassArr.length; g++) {
            for (var i = 0; i < this.body.length; i++) {
                if (grassArr[g]) {
                    if (grassArr[g].x == this.body[i][0] && grassArr[g].y == this.body[i][1]) {
                        console.log("grass")
                        grassArr.splice(g, 1);
                        g--
                    }

                }
            }
        }

        for (var e = 0; e < eaterArr.length; e++) {
            for (var i = 0; i < this.body.length; i++) {
                if (eaterArr[e]) {
                    if (eaterArr[e].x == this.body[i][0] && eaterArr[e].y == this.body[i][1]) {
                        eaterArr.splice(e, 1);
                        e--;
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
