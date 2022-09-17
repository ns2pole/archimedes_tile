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

    getLength() {
        return Math.sqrt(Math.pow(this.v2.x - this.v1.x, 2) + Math.pow(this.v2.y - this.v1.y, 2));
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

    equals(vertex) {
        return (this.v1 === vertex.v1 && this.v2 === vertex.v2) || (this.v1 === vertex.v2 && this.v2 === vertex.v1);
    }

    draw() {
        line(this.v1.x, this.v1.y, this.v2.x, this.v2.y);
    }
}