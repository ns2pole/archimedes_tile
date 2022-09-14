class Triangle extends Polygon {
    constructor(v1, v2, v3) {
        let vertexes = new Array();
        vertexes.push(v1);
        vertexes.push(v2);
        vertexes.push(v3);
        super(vertexes);
    }

    // return Triangle object
    getRefrectedTriangeFor(edge) {
        const refrectedPolygon = this.getRefrectedPolygonFor(edge);
        return new Triangle(refrectedPolygon.vertexes[0], refrectedPolygon.vertexes[1], refrectedPolygon.vertexes[2]);
    }

    // return Rectangle object on anticlockwise side for edge
    static getTriangleFor(edge) {
        const vec2D = edge.getVec2D();
        const rotetedVec = vec2D.getVecRoteatedBy(Math.PI / 3);
        const thirdVertex = edge.v1.getVertexActionedBy(rotetedVec);
        return new Triangle(edge.v1, edge.v2, thirdVertex);
    }
    
}