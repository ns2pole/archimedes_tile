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
        edges.forEach((edge) => {
            if(!edge.isSandwichedByPolygon(plane)) {
                console.table(edge);
                result.add(edge);
            }
        });
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

    getAroundPolygonNumBy(plane) {
        return this.geAroundtAllPolygonsBy(plane).size;
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
    
    getFourVertexesBy(plane) {
        if(this.getDegreeBy(plane) == 3 && 
            this.getAroundPolygonNumBy(plane) == 2
        )
         {
            const result = new Set();
            const edgesNotSandwiched = this.getConnectedAllEdgesNotSandwichedBy(plane);
            edgesNotSandwiched.forEach((edge) => {
                const vertexes = edge.getVertexes();
                vertexes.forEach((vertex) => {
                    const tmp = vertex.getOhterVertexOf(edge);
                    const adjacentingPolygon = edge.getAdjacentingAllPolygonsBy(plane)[Symbol.iterator]().next().value;
                    result.add(Vertex.getRectangleVertexOppositeSideOf(tmp, edge, adjacentingPolygon));
                });
            });
            return result;
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

    static getVertexesOtherThanMySelfFrom(vertexes) {
        const vertexesOtherThanMySelf = new Set();
        vertexes.forEach((vertex) => {
            if(vertex !== this) {
                vertexesOtherThanMySelf.add(vertex);
            }
        });
        return vertexesOtherThanMySelf;
    }

    draw() {
        circle(this.x, this.y, 10);
    }
}
