//this class represent "static" vertex
class Vertex {
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

    getVertexActionedBy(vec2D) {
        return new Vertex(this.x + vec2D.x, this.y + vec2D.y);
    }

    getDistanceBetween(vertex) {
        return Math.sqrt(Math.pow(this.x - vertex.x, 2) + Math.pow(this.y - vertex.y, 2));
    }


    getConntectedAllEdgesBy(plane) {
        const edges = new Set();
        plane.edges.forEach((edge) => {
            if(edge.has(this)) {
                edges.add(edge);
            }
        });
        return edges;
    }

    getConnectedAllEdgesNotSandwichedBy(plane) {
        const result = new Set();
        const edges = this.getConntectedAllEdgesBy(plane);
        console.log(edges)
        edges.forEach((edge) => {
            console.log(111)
            if(!edge.isSandwichedByPolygon(plane)) {
                result.add(edge);
            }
        });
        console.log(result)
        return result;
    }


    getDegreeBy(plane) {
        return this.getConntectedAllEdgesBy(plane).size;
    }

    geAroundtAllPolygonsBy(plane) {
        const polygons = new Set();
        plane.triangles.forEach((triangle) => {
            if(triangle.hasV(this)) {
                polygons.add(triangle);
            }
        });
        plane.rectangles.forEach((rectangle) => {
            if(rectangle.hasV(this)) {
                polygons.add(rectangle);
            }
        });
        return polygons;
    }

    geAroundtAllTrianglesBy(plane) {
        const triangles = new Set();
        plane.triangles.forEach((triangle) => {
            if(triangle.hasV(this)) {
                triangles.add(triangle);
            }
        });
        return triangles;
    }


    geAroundtAllRectanglesBy(plane) {
        const rectangles = new Set();
        plane.rectangles.forEach((rectangle) => {
            if(rectangle.hasV(this)) {
                rectangles.add(triangle);
            }
        });
        return rectangles;
    }

    getAroundPolygonNumBy(plane) {
        return this.geAroundtAllPolygonsBy(plane).size;
    }

    getAroundTriangleNumBy(plane) {
        return this.geAroundtAllTrianglesBy(plane).size;
    }

    getAroundRectangleNumBy(plane) {
        return this.geAroundtAllRectanglesBy(plane).size;
    }

    getOhterVertexOf(edge) {
        if(edge.v1 === this) {
            return edge.v2;
        } else if(edge.v2 === this) {
            return edge.v1;
        } else {
            throw new Error('vertex is not included in this edge');
        }
    }

    static getRectangleVertexOppositeSideOf(vertex, edge, triangle) {
        const ohterVertex = vertex.getOhterVertexOf(edge);
        const vec2D = Vec2D.getVec2DBy(vertex, ohterVertex);
        const vec2DToCenter = Vec2D.getVec2DBy(vertex, triangle.getCenter());
        if(vec2D.getAntiClockwiseNormalVec().getInnnerProductWith(vec2DToCenter) < 0) {
            return vertex.getVertexActionedBy(vec2D.getAntiClockwiseNormalVec());
        } else {
            return vertex.getVertexActionedBy(vec2D.getClockwiseNormalVec());
        }
    }

    getVertexesOtherThanMySelfFrom(vertexes) {
        const vertexesOtherThanMySelf = new Set();
        vertexes.forEach((vertex) => {
            if(vertex !== this) {
                vertexesOtherThanMySelf.add(vertex);
            }
        });
        return vertexesOtherThanMySelf;
    }

    draw() {
        fill(color("#00FF00"));
        circle(this.x, this.y, 10);
    }
}
