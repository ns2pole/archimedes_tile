// this class means direction vecter two dimension
class Vec2D {
    constructor(x, y) {
        Object.defineProperty(
            this,
            'x', {
              value: x
            }
        );
        Object.defineProperty(
            this,
            'y', {
              value: y
            }
        );
    }

    getMultiplicatedVecBy(scalar) {
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
        return new Vec2D(this.x + vec2D.x, this.y + vec2D.y);
    }

    getInverseVec() {
        return this.getMultiplicatedVecBy(-1);
    }

    //rotate by 90 degree anticlockwise
    getNormalVec() {
        return new Vec2D(this.y, - this.x);
    }

    getAreaGeneretedBy(vec2D) {
        return (this.x * vec2D.y - this.y * vec2D.x);
    }
}