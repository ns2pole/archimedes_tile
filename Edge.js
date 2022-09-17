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
    }

    getVertexes() {
        return new Set([this.v1, this.v2]);
    }

    static getAllVertexesOf(edges) {
        const vertexes = new Set();
        edges.forEach((edge) => {
            edge.getVertexes().forEach((vertex) => {
                vertexes.add(vertex);
            });
        });
        return vertexes;
    }

    has(vertex) {
        return this.v1 === vertex || this.v2 === vertex;
    }

    getAllAdjacentingTrianglesBy(plane) {
        const triangles = new Set();
        plane.triangles.forEach((triangle) => {
            if(triangle.hasE(this)) {
                triangles.add(triangle);
            }
        });
        return triangles;
    }

    getAdjacentingAllPolygonsBy(plane) {
        const polygons = new Set();
        plane.triangles.forEach((triangle) => {
            if(triangle.hasE(this)) {
                polygons.add(triangle);
            }
        });
        plane.rectangles.forEach((rectangle) => {
            if(rectangle.hasE(this)) {
                polygons.add(rectangle);
            }
        });
        return polygons;
    }

    getPolygonNumAdjacentingTo(plane) {
        return this.getAdjacentingAllPolygonsBy(plane).size;
    }

    getMiddleVertex() {
        return new Vertex((this.v1.x + this.v2.x) / 2, (this.v1.y + this.v2.y) / 2);
    }

    isSandwichedByPolygon(plane) {
        if(this.getPolygonNumAdjacentingTo(plane) == 1) {
            return false;
        } else {
            return true
        }
    }

    getVertexesOfBothSidesTriangles() {
        const vec2D = Vec2D.getVec2DBy(this.v1, this.v2);
        const rotatedVec1 = vec2D.getVecRoteatedBy(Math.PI / 3);
        const rotatedVec2 = vec2D.getVecRoteatedBy(- Math.PI / 3);
        return new Set([this.v1.getVertexActionedBy(rotatedVec1), this.v1.getVertexActionedBy(rotatedVec2)]);
    }

    equals(vertex) {
        return (this.v1 === vertex.v1 && this.v2 === vertex.v2) || (this.v1 === vertex.v2 && this.v2 === vertex.v1);
    }

    draw() {
        line(this.v1.x, this.v1.y, this.v2.x, this.v2.y);
    }
}