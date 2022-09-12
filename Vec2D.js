class Vec2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getVecMultiplicationBy(scalar) {
        return new Vec2D(this.x * scalar, this.y * scalar);
    }

    getNorm() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    getNormalizedVec() {
        let length = this.getNorm();
        return new Vec2D(this.x / length, this.y / length);
    }

    getAddedVecFor(vec2D) {
        let clone = new Vec2D(this.x, this.y);
        clone.x += vec2D.x;
        clone.y += vec2D.y;
        return clone;
    }

    getInverseVec() {
        return this.getVecMultiplicationBy(-1);
    }

    //rotate by 90 degree anticlockwise
    getNormalVec() {
        return new Vec2D(this.y, - this.x);
    }

    getAreaGeneretedBy(vec2D) {
        return this.x * vec2D.y - this.y * vec2D.x;
    }
}