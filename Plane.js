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
        const bothSideVertexes = initEdge.getVertexesOfBothSidesTriangles();
        const thirdVertex = Array.from(bothSideVertexes)[0];
        const fourthVertex = Array.from(bothSideVertexes)[1];
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
        const edgesNotSandwiched = vertex.getAllAdjacentEdgesNotSandwichedFrom(this);
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
        return new Object({"newVertexes": resultVertexes, "newEdges": resultEdges, "newTriangles": new Set(), "newRectangles":resultRectangles});
    }

    getNew1Edges1TrianglesAdjacentingTo(vertex) {
        const edgesNotSandwiched = vertex.getAllAdjacentEdgesNotSandwichedFrom(this);
        const vertexes = vertex.getVertexesOtherThanMySelfFrom(Edge.getAllVertexesOf(edgesNotSandwiched));
        const newEdges = new Set();
        const newEdge = new Edge(Array.from(vertexes)[0], Array.from(vertexes)[1]);
        newEdges.add(newEdge);
        const newTriangles = new Set();
        newTriangles.add(new Triangle(vertex, Array.from(vertexes)[0], Array.from(vertexes)[1], Array.from(edgesNotSandwiched)[0], newEdge, Array.from(edgesNotSandwiched)[1]));
        return new Object({"newVertexes": new Set(), "newEdges": newEdges, "newTriangles": newTriangles, "newRectangles": new Set()});
    }

    getNew1Vertexes3Edges2TrianglesAdjacentingTo(vertex) {
        const newEdges = new Set();
        const newTriangles = new Set();
        const edgesNotSandwiched = vertex.getAllAdjacentEdgesNotSandwichedFrom(this);
        const threeVertexes = Edge.getAllVertexesOf(edgesNotSandwiched);
        const otherVertexes = vertex.getVertexesOtherThanMySelfFrom(threeVertexes);
        const newVertex = Vertex.getTheOtherVertexOfRhombusFrom(vertex, Array.from(otherVertexes)[0], Array.from(otherVertexes)[1]);
        newEdges.add(new Edge(newVertex, vertex));
        newEdges.add(new Edge(newVertex, Array.from(otherVertexes)[0]));
        newEdges.add(new Edge(newVertex, Array.from(otherVertexes)[1]));
        edgesNotSandwiched.forEach((edge) => {
            const vertexes = edge.getVertexes();
            newTriangles.add(new Triangle(
                Array.from(vertexes)[0],
                Array.from(vertexes)[1],
                newVertex,
                edge,
                new Edge(Array.from(vertexes)[0], newVertex),
                new Edge(Array.from(vertexes)[1], newVertex),
            ));
        });
        return new Object({"newVertexes": new Set([newVertex]), "newEdges": newEdges, "newTriangles": newTriangles, "newRectangles": new Set()});
    }

    getNew1Vertexes2Edges1RectangleAdjacentingTo(vertex) {
        const edgesNotSandwiched = vertex.getAllAdjacentEdgesNotSandwichedFrom(this);
        const threeVertexes = Edge.getAllVertexesOf(edgesNotSandwiched);
        const otherVertexes = vertex.getVertexesOtherThanMySelfFrom(threeVertexes);
        //newVertexは1点集合
        const newVertex = Vertex.getTheOtherVertexOfRhombusFrom(vertex, Array.from(otherVertexes)[0], Array.from(otherVertexes)[1]);
        const newEdge1 = new Edge(newVertex, Array.from(otherVertexes)[0]);
        const newEdge2 = new Edge(newVertex, Array.from(otherVertexes)[1]);
        const newRectangle = new Rectangle(
            vertex,
            Array.from(otherVertexes)[0],
            newVertex,
            Array.from(otherVertexes)[1],
            Array.from(edgesNotSandwiched)[0],
            newEdge1,
            newEdge2,
            Array.from(edgesNotSandwiched)[1],
        );
        return new Object({"newVertexes": new Set([newVertex]), "newEdges": new Set([newEdge1, newEdge2]), "newTriangles": new Set(), "newRectangles": new Set([newRectangle])});
    }

    isNextVertexForTiling(vertex) {
        console.log("deg" + vertex.getDegreeBy(this))
        console.log("ar" + vertex.getAroundTriangleNumBy(this))
        if((vertex.getDegreeBy(this) == 3 && vertex.getAroundTriangleNumBy(this) == 2)
            || (vertex.getDegreeBy(this) == 5 && vertex.getAroundPolygonNumBy(this) == 4)
            || (vertex.getDegreeBy(this) == 4 && vertex.getAroundRectangleNumBy(this) == 2)) {
            return true;
        } else {
            return false;
        }
    }

    getNewObjAround(vertex) {
        if(vertex.getDegreeBy(this) == 3 && vertex.getAroundTriangleNumBy(this) == 2) {
            console.table("3-2");
            return this.getNew4Vertexes6Edges2RectanglesAdjacentingTo(vertex);
        }
        if(vertex.getDegreeBy(this) == 5 && vertex.getAroundTriangleNumBy(this) == 2 && vertex.getAroundRectangleNumBy(this) == 2) {
            console.table("5-2-2");
            return this.getNew1Edges1TrianglesAdjacentingTo(vertex);
        }
        if(vertex.getDegreeBy(this) == 5 && vertex.getAroundTriangleNumBy(this) == 3 && vertex.getAroundRectangleNumBy(this) == 1) {
            console.table("5-3-1");
            return this.getNew1Vertexes2Edges1RectangleAdjacentingTo(vertex);
        }
        if(vertex.getDegreeBy(this) == 4 && vertex.getAroundRectangleNumBy(this) == 2) {
            console.table("4-2");
            return this.getNew1Vertexes3Edges2TrianglesAdjacentingTo(vertex);
        } 
    }

    evolute() {
        const vertexArr = Array.from(this.vertexs);
        for(let i = 0; i < vertexArr.length; i++) {
            if(new Vertex(ORIGIN_X, ORIGIN_Y).getDistanceBetween(vertexArr[i]) < 100 * SCALE
                && this.isNextVertexForTiling(vertexArr[i])) {
                const result = this.getNewObjAround(vertexArr[i]);
                this.vertexs.union(result.newVertexes);
                this.edges.union(result.newEdges);
                this.triangles.union(result.newTriangles);
                this.rectangles.union(result.newRectangles);
                break;
            }
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
