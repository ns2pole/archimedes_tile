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
        const initEdge = new Edge(initVertex, secondVertex);
        const bothSideVertexes = initEdge.getVertexesOfBothSidesTriangles();
        const thirdVertex = Array.from(bothSideVertexes)[0];
        const fourthVertex = Array.from(bothSideVertexes)[1];
        const secondEdge = new Edge(initVertex, thirdVertex);
        const thirdEdge = new Edge(secondVertex, thirdVertex);
        const fourthEdge = new Edge(initVertex, fourthVertex);
        const fifthEdge = new Edge(secondVertex, fourthVertex);
        const initTriangle = new Triangle(initVertex, secondVertex, thirdVertex, RGB.getRandom());
        const secondTriangle = new Triangle(initVertex, secondVertex, fourthVertex, RGB.getRandom());

        this.vertexs.add(initVertex);
        this.vertexs.add(secondVertex);
        this.vertexs.add(thirdVertex);
        this.vertexs.add(fourthVertex);
        this.edges.add(initEdge);
        this.edges.add(secondEdge);
        this.edges.add(thirdEdge);
        this.edges.add(fourthEdge);
        this.edges.add(fifthEdge);
        this.triangles.add(initTriangle);
        this.triangles.add(secondTriangle);
        
    }

    getNew4Vertexes6Edges2RectanglesAdjacentingTo(vertex) {
        const arrOfEdgesNotSandwiched = Array.from(vertex.getAllAdjacentEdgesNotSandwichedFrom(this));
        const newVertexes = new Set();
        const newEdges = new Set();
        const newRectangles = new Set();
        for(let edge of arrOfEdgesNotSandwiched) {
            const triangle = Array.from(edge.getAllAdjacentingTrianglesBy(this))[0];
            const otherVertex = vertex.getOhterVertexOf(edge);
            const v1 = Vertex.getRectangleVertexOppositeSideOf(vertex, edge, triangle);
            const v2 = Vertex.getRectangleVertexOppositeSideOf(otherVertex, edge, triangle);
            newVertexes.add(v1);
            newVertexes.add(v2);
            newEdges.add(new Edge(vertex, v1));
            newEdges.add(new Edge(v1, v2));
            newEdges.add(new Edge(otherVertex, v2));
            newRectangles.add(new Rectangle(vertex, v1, v2, otherVertex, RGB.getRandom()));
        }
        return new Object({"newVertexes": newVertexes, "newEdges": newEdges, "newTriangles": new Set(), "newRectangles": newRectangles});
    }

    getNew1Edges1TrianglesAdjacentingTo(vertex) {
        const edgesNotSandwiched = vertex.getAllAdjacentEdgesNotSandwichedFrom(this);
        const vertexes = vertex.getVertexesOtherThanMySelfFrom(Edge.getAllVertexesOf(edgesNotSandwiched));
        const newEdge = new Edge(Array.from(vertexes)[0], Array.from(vertexes)[1]);
        const newTriangle = new Triangle(vertex, Array.from(vertexes)[0], Array.from(vertexes)[1], RGB.getRandom());
        return new Object({"newVertexes": new Set(), "newEdges": new Set([newEdge]), "newTriangles": new Set([newTriangle]), "newRectangles": new Set()});
    }

    getNew1Vertexes3Edges2TrianglesAdjacentingTo(vertex) {
        const edgesNotSandwiched = vertex.getAllAdjacentEdgesNotSandwichedFrom(this);
        const threeVertexes = Edge.getAllVertexesOf(edgesNotSandwiched);
        const otherVertexesArr = Array.from(vertex.getVertexesOtherThanMySelfFrom(threeVertexes));
        const newVertex = Vertex.getTheOtherVertexOfRhombusFrom(vertex, otherVertexesArr[0], otherVertexesArr[1]);
        const newEdge1 = new Edge(newVertex, vertex);
        const newEdge2 = new Edge(newVertex, otherVertexesArr[0]);
        const newEdge3 = new Edge(newVertex, otherVertexesArr[1]);
        const edgeArr = Array.from(edgesNotSandwiched)
        const newTriangle1 = new Triangle(newVertex, edgeArr[0].v1, edgeArr[0].v2, RGB.getRandom());
        const newTriangle2 = new Triangle(newVertex, edgeArr[1].v1, edgeArr[1].v2, RGB.getRandom());
        return new Object({"newVertexes": new Set([newVertex]), "newEdges": new Set([newEdge1, newEdge2, newEdge3]), "newTriangles": new Set([newTriangle1, newTriangle2]), "newRectangles": new Set()});
    }

    getNew1Vertexes2Edges1RectangleAdjacentingTo(vertex) {
        const edgesNotSandwiched = vertex.getAllAdjacentEdgesNotSandwichedFrom(this);
        const threeVertexes = Edge.getAllVertexesOf(edgesNotSandwiched);
        const otherVertexes = vertex.getVertexesOtherThanMySelfFrom(threeVertexes);
        const newVertex = Vertex.getTheOtherVertexOfRhombusFrom(vertex, Array.from(otherVertexes)[0], Array.from(otherVertexes)[1]);
        const newEdge1 = new Edge(newVertex, Array.from(otherVertexes)[0]);
        const newEdge2 = new Edge(newVertex, Array.from(otherVertexes)[1]);
        const newRectangle = new Rectangle(vertex, Array.from(otherVertexes)[0], newVertex, Array.from(otherVertexes)[1], RGB.getRandom());
        return new Object({"newVertexes": new Set([newVertex]), "newEdges": new Set([newEdge1, newEdge2]), "newTriangles": new Set(), "newRectangles": new Set([newRectangle])});
    }

    isNextVertexForTiling(vertex) {
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
        this.edges.forEach((edge) => {
            edge.draw();
        });
        this.triangles.forEach((triangle) => {
            triangle.draw();
        });
        this.rectangles.forEach((rectangle) => {
            rectangle.draw();
        });
        this.vertexs.forEach((vertex) => {
            vertex.draw();
        });
    }
}
