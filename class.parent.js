module.exports = class Parent {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.directions = this.directionMaker(1);
    }

    yntrelVandak(ch) {

        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < global.matrix[0].length && y >= 0 && y < global.matrix.length) {
                if (global.matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    directionMaker(n) {
        var tempArr = []
        for (var i = -n; i <= n; i++) {
            for (var j = -n; j <= n; j++) {
                tempArr.push([this.x + i, this.y + j]);
            }
        }
        return tempArr;
    }
}