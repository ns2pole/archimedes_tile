class Vertex {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    refrectionFor(edge) {
        let v1 = edge.v1;
        let v2 = edge.v2;
        let normalVec2D = new Vec2D(v1.y - v2.y, -v1.x + v2.x).getNormalizedVec();
        return new Vertex(x3, y3);
    }

    getDistanceTo(straightLine) {
        
    }

    getVec2D() {
        return new Vec2D(this.x, this.y);
    }

    draw() {
        circle(this.x, this.y, 10);
    }
}