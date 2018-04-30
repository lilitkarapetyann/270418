class Grass extends Parent{
    mul() {
        this.multiply++;
        var norVandak = random(this.yntrelVandak(0));
        if (this.multiply >= 4 && norVandak) {
            this.multiply = 0; 
            matrix[norVandak[1]][norVandak[0]] = 1;
            grassArr.push(new Grass(norVandak[0], norVandak[1]));
        }
    }
}