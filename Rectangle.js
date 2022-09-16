class Rectangle extends Polygon {
    constructor(v1, v2, v3, v4, e1, e2, e3, e4) {
        let vertexes = new Set();
        vertexes.add(v1);
        vertexes.add(v2);
        vertexes.add(v3);
        vertexes.add(v4);
        let edges = new Set();
        edges.add(e1);
        edges.add(e2);
        edges.add(e3);
        edges.add(e4);
        super(vertexes, edges);
    }

    // return Rectangle object
    getRefrectedRectangleFor(edge) {
        const refrectedPolygon = this.getRefrectedPolygonFor(edge);
        return new Rectangle(refrectedPolygon.vertexes[0], refrectedPolygon.vertexes[1], refrectedPolygon.vertexes[2], refrectedPolygon.vertexes[3]);
    }
}
