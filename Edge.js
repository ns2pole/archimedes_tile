//pair of vertex class
class Edge {
    constructor(v1, v2) {
        Object.defineProperty(
            this,
            'v1', {
              value: v1
            }
        );
        Object.defineProperty(
            this,
            'v2', {
              value: v2
            }
        );
        Object.defineProperty(
            this,
            'contactingPolygons', {
              value: new Array()
            }
        );
    }

    getVec2D() {
        return new Vec2D(this.v2.x - this.v1.x, this.v2.y - this.v1.y);
    }

    getLength() {
        return Math.sqrt(Math.pow(this.v2.x - this.v1.x, 2) + Math.pow(this.v2.y - this.v1.y, 2));
    }

    getLine() {
        if(this.v1.x == this.v2.x) {
            return new Line(this.v1, new Vec2D(0, 1));
        } else {
            const inclination = (this.v2.y - this.v1.y) / (this.v2.x - this.v1.x);
            return new Line(this.v1, new Vec2D(1, inclination).getNormalizedVec());
        }
    }

    getMiddleVertex() {
        return new Vertex((this.v1.x + this.v2.x) / 2, (this.v1.y + this.v2.y) / 2);
    }

    draw() {
        line(this.v1.x, this.v1.y, this.v2.x, this.v2.y);
    }
}