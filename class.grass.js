var Parent = require('./class.parent')

module.exports = class Grass extends Parent{
    mul() {
        this.multiply++;
        var norVandak = this.yntrelVandak(0)[Math.floor(Math.random(this.yntrelVandak(0).length))];
        if (this.multiply >= 4 && norVandak) {
            this.multiply = 0; 
            global.matrix[norVandak[1]][norVandak[0]] = 1;
            global.grassArr.push(new Grass(norVandak[0], norVandak[1]));
        }
    }
}