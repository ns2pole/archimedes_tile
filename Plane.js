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
    }

    getNew4Vertexes6Edges2RectanglesAdjacentingTo(vertex) {
        const resultVertexes = new Set();
        const resultEdges = new Set();
        const resultRectangles = new Set();
        const edgesNotSandwiched = vertex.getConnectedAllEdgesNotSandwichedBy(this);
        edgesNotSandwiched.forEach((edge) => {
            const vertexes = edge.getVertexes();
            const tmpV = new Set();
            const tmpE = new Set([edge]);
            vertexes.forEach((vertex) => {
                const adjacentingPolygon = edge.getAdjacentingAllPolygonsBy(this)[Symbol.iterator]().next().value;
                const newVertex = Vertex.getRectangleVertexOppositeSideOf(vertex, edge, adjacentingPolygon);
                resultVertexes.add(newVertex);
                tmpV.add(newVertex);
                tmpE.add(new Edge(vertex, newVertex));
                resultEdges.add(new Edge(vertex, newVertex));
            });
            resultEdges.add(new Edge(Array.from(tmpV)[0], Array.from(tmpV)[1]))
            resultRectangles.add(new Rectangle(
                edge.v1,
                Array.from(tmpV)[0],
                Array.from(tmpV)[1],
                edge.v2,
                edge,
                Array.from(tmpE)[1],
                new Edge(Array.from(tmpV)[0], Array.from(tmpV)[1]),
                Array.from(tmpE)[2],
            ));
        });
        return new Object({"resultVertexes": resultVertexes, "resultEdges": resultEdges, "resultRectangles":resultRectangles});
    }

    getNew1Edges1TrianglesAdjacentingTo(vertex) {
        
    }

    getNew1Vertexes3Edges2TrianglesAdjacentingTo(vertex) {
    }

    getNewObjAround(vertex) {
        if(vertex.getDegreeBy(this) == 3 && vertex.getAroundPolygonNumBy(this) == 2) {
            return this.getNew4Vertexes6Edges2RectanglesAdjacentingTo(vertex);
        } else if(vertex.getDegreeBy(this) == 5 && vertex.getAroundPolygonNumBy(this) == 4) {
            return this.getNew1Edges1TrianglesAdjacentingTo(vertex);
        } else if(vertex.getDegreeBy(this) == 4 && vertex.getAroundRectangleNumBy(this) == 2) {
            return this.getNew1Vertexes3Edges2TrianglesAdjacentingTo(vertex);
        }
    }

    evolute() {
        const vertex = Array.from(this.vertexs)[Math.floor(Math.random() * this.vertexs.size)];
        const result = this.getNewObjAround(vertex);
        this.vertexs.union(result.resultVertexes);
        this.edges.union(result.resultEdges);
        this.rectangles.union(result.resultRectangles);
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
