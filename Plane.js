class Plane {
    constructor() {
        this.vertexs = new Set();
        this.edges = new Set();
        this.triangles = new Set();
        this.rectangles = new Set();
    }

    init() {
        const initVertex = new Vertex(ORIGIN_X, ORIGIN_Y);
        const secondVertex = initVertex.getVertexActionedBy(Vec2D.getRandomNormalizedVec().getMultiplicatedVecBy(SCALE));
        this.vertexs.add(initVertex);
        this.vertexs.add(secondVertex);
        const initEdge = new Edge(initVertex, secondVertex);
        this.edges.add(initEdge);
        const thirdVertex = Triangle.getVertexOfRightSideTriangleFor(initEdge);
        const fourthVertex = Triangle.getVertexOfLeftSideTriangleFor(initEdge);
        this.vertexs.add(thirdVertex);
        this.vertexs.add(fourthVertex);
        const secondEdge = new Edge(initVertex, thirdVertex);
        const thirdEdge = new Edge(initVertex, fourthVertex);
        const fourthEdge = new Edge(secondVertex, thirdVertex);
        const fifthEdge = new Edge(secondVertex, fourthVertex);
        this.edges.add(secondEdge);
        this.edges.add(thirdEdge);
        this.edges.add(fourthEdge);
        this.edges.add(fifthEdge);
        const initTriangle = new Triangle(initVertex, secondVertex, thirdVertex, initEdge, secondEdge, thirdEdge);
        const secondTriangle = new Triangle(initVertex, secondVertex, fourthVertex, initEdge, fourthEdge, fifthEdge);
        this.triangles.add(initTriangle);
        this.triangles.add(secondTriangle);
        const result = initVertex.getFourVertexesBy(this);
        this.vertexs.union(result.resultVertexes);
        this.edges.union(result.resultEdges);
        this.rectangles.union(result.resultRectangles);
        console.table(this);
    }


    draw() {
        this.triangles.forEach((triangle) => {
            triangle.draw();
        });
        this.rectangles.forEach((rectangle) => {
            rectangle.draw();
        });
        this.edges.forEach((edge) => {
            edge.draw();
        });
        this.vertexs.forEach((vertex) => {
            vertex.draw();
        });
    }
}
