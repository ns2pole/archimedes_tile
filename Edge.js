//pair of vertex class
class Edge {
    constructor(v1, v2) {
        this.v1 = v1;
        this.v2 = v2;
    }

    getLength() {
        return Math.sqrt(Math.pow(this.v2.x - this.v1.x, 2) + Math.pow(this.v2.y - this.v1.y, 2));
    }

    getStraightLine() {
        if(this.v1.x == this.v2.x) {
            return new StraightLine(this.v1, new Vec2D(0, 1));
        } else {
            let inclination = (this.v2.y - this.v1.y) / (this.v2.x - this.v1.x);
            return new StraightLine(this.v1v1, new Vec2D(1, inclination).getNormalizedVec());
        }
    }
}