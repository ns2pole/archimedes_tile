class Triangle extends RegularPolygon {
    constructor(v1, v2, v3) {
        let vertexes = new Array();
        vertexes.push(v1);
        vertexes.push(v2);
        vertexes.push(v3);
        super(vertexes);
    }

    getRefrectedTriangleFor(edge) {
        let refrectedVertexes = new Array();
        this.vertexes.forEach((vertex) => {
            refrectedVertexes.push(vertex.getRefrectedVertexFor(edge));
        });
        return new Triangle(refrectedVertexes[0], refrectedVertexes[1], refrectedVertexes[2]);
    }

    
}
