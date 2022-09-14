class Polygon {
  constructor(vertexes) {
    Object.defineProperty(
      this,
      'vertexes', {
        value: vertexes
      }
    );
    const edges = new Array();
    for(let i = 0; i < vertexes.length; i++) {
      edges.push(new Edge(vertexes[i], vertexes[(i + 1) % vertexes.length]));
    }
    Object.defineProperty(
      this,
      'edges', {
        value: edges
      }
    );
  }

  getRefrectedPolygonFor(edge) {
    let refrectedVertexes = new Array();
    this.vertexes.forEach((vertex) => {
        refrectedVertexes.push(vertex.getRefrectedVertexFor(edge));
    });
    return new Polygon(refrectedVertexes);
  }

  draw() {
    this.edges.forEach((edge) => {
        edge.draw();
    });
    this.vertexes.forEach((vertex) => {
      vertex.draw();
    });
  }
}