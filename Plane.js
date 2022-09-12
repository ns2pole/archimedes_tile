class Plane {
    constructor() {
        this.triangles = new Array();
        this.rectangles = new Array();
        Object.defineProperty(
            this,
            'initVertex', {
              value: new Vertex(ORIGIN_X, ORIGIN_Y)
            }
        );
        const vec2D = Vec2D.getRandomNormalizedVec()
        Object.defineProperty(
            this,
            'initDirectionVec', {
              value: vec2D.getMultiplicatedVecBy(SCALE)
            }
        );

        Object.defineProperty(
            this,
            'vertexOfOriginNext', {
              value: this.initVertex.getVertexActionedBy(this.initDirectionVec)
            }
        );

    }

    init() {
        const initEdge = new Edge(this.initVertex, this.vertexOfOriginNext);
        const initTriangle = Triangle.getTriangleFor(initEdge);
        this.triangles.push(initTriangle);
        const edge = new Edge(initTriangle.vertexes[0], initTriangle.vertexes[2]);
        const secondTriangle = Triangle.getTriangleFor(edge);
        this.triangles.push(secondTriangle);
    }

    draw() {
        this.triangles.forEach((triangle) => {
            triangle.draw();
        });
        this.rectangles.forEach((rectangle) => {
            rectangle.draw();
        });
    }
}
