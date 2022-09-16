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
                new Edge(edge.v2, edge.v1),
                Array.from(tmpE)[1],
                new Edge(Array.from(tmpV)[0], Array.from(tmpV)[1]),
                new Edge(Array.from(tmpE)[2].v2, Array.from(tmpE)[2].v1)
            ));
        });
        return new Object({"newVertexes": resultVertexes, "newEdges": resultEdges, "newTriangles": new Set(), "newRectangles":resultRectangles});
    }

    getNew1Edges1TrianglesAdjacentingTo(vertex) {
        const edgesNotSandwiched = vertex.getConnectedAllEdgesNotSandwichedBy(this);
        console.table(edgesNotSandwiched);
        const vertexes = vertex.getVertexesOtherThanMySelfFrom(Edge.getAllVertexesOf(edgesNotSandwiched));
        const newEdges = new Set();
        const newEdge = new Edge(Array.from(vertexes)[0], Array.from(vertexes)[1]);
        newEdges.add(newEdge);
        const newTriangles = new Set();
        newTriangles.add(new Triangle(vertex, Array.from(vertexes)[0], Array.from(vertexes)[1], Array.from(edgesNotSandwiched)[0], newEdge, Array.from(edgesNotSandwiched)[1]));
        return new Object({"newVertexes": new Set(), "newEdges": newEdges, "newTriangles": newTriangles, "newRectangles": new Set()});
    }

    getNew1Vertexes3Edges2TrianglesAdjacentingTo(vertex) {
        
        return new Object({"newVertexes": new Set(), "newEdges": new Set(), "newTriangles": new Set(), "newRectangles": new Set()});
    }

    isNextVertexForTiling(vertex) {
        if((vertex.getDegreeBy(this) == 3 && vertex.getAroundPolygonNumBy(this) == 2)
            || (vertex.getDegreeBy(this) == 5 && vertex.getAroundPolygonNumBy(this) == 4)
            || (vertex.getDegreeBy(this) == 4 && vertex.getAroundRectangleNumBy(this) == 2)) {
            return true;
        } else {
            return false;
        }
    }

    getNewObjAround(vertex) {
        if(vertex.getDegreeBy(this) == 3 && vertex.getAroundPolygonNumBy(this) == 2) {
            console.log("3,2")
            return this.getNew4Vertexes6Edges2RectanglesAdjacentingTo(vertex);
        }
        if(vertex.getDegreeBy(this) == 5 && vertex.getAroundPolygonNumBy(this) == 4) {
            console.log("5,4")
            return this.getNew1Edges1TrianglesAdjacentingTo(vertex);
        }
        if(vertex.getDegreeBy(this) == 4 && vertex.getAroundRectangleNumBy(this) == 2) {
            console.log("4,2")
            return this.getNew1Vertexes3Edges2TrianglesAdjacentingTo(vertex);
        } 
    }

    evolute() {
        const vertex = Array.from(this.vertexs)[Math.floor(Math.random() * this.vertexs.size)];
        if(this.isNextVertexForTiling(vertex)) {
            const result = this.getNewObjAround(vertex);
            this.vertexs.union(result.newVertexes);
            this.edges.union(result.newEdges);
            this.triangles.union(result.newTriangles);
            this.rectangles.union(result.newRectangles);
        }
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
