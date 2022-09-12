class Rectangle extends RegularPolygon {
    constructor(v1, v2, v3, v4) {
        let vertexes = new Array();
        vertexes.push(v1);
        vertexes.push(v2);
        vertexes.push(v3);
        vertexes.push(v4);
        super(vertexes);
    }
}
