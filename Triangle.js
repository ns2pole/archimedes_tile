class Triangle extends Polygon {
    constructor(v1, v2, v3, e1, e2, e3) {
        let vertexes = new Set();
        vertexes.add(v1);
        vertexes.add(v2);
        vertexes.add(v3);
        let edges = new Set();
        edges.add(e1);
        edges.add(e2);
        edges.add(e3);
        super(vertexes, edges);
    }


    static getVertexOfRightSideTriangleFor(edge) {
        const vec2D = Vec2D.getVec2DBy(edge.v1, edge.v2);
        const rotatedVec = vec2D.getVecRoteatedBy(Math.PI / 3);
        return  edge.v1.getVertexActionedBy(rotatedVec);
    }

    getCenter() {
        const arr = Array.from(this.vertexes);
        const x = (arr[0].x + arr[1].x + arr[2].x) / 3;
        const y = (arr[0].y + arr[1].y + arr[2].y) / 3;
        return new Vertex(x, y);
    }

    static getVertexOfLeftSideTriangleFor(edge) {
        const vec2D = Vec2D.getVec2DBy(edge.v1, edge.v2);
        const rotatedVec = vec2D.getVecRoteatedBy(- Math.PI / 3);
        return edge.v1.getVertexActionedBy(rotatedVec);
    }

    static getVertexesOfBothSidesTrianglesFor(edge) {
        const set = new Set();
        set.add(Triangle.getVertexOfRightSideTriangleFor(edge));
        set.add(Triangle.getVertexOfLeftSideTriangleFor(edge));
        return set;
    }

    draw() {
        const arr = Array.from(this.vertexes);
        fill("yellow");
        triangle(arr[0].x, arr[0].y, arr[1].x, arr[1].y, arr[2].x, arr[2].y);
    }

   

}