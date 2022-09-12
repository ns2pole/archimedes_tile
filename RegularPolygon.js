class RegularPolygon {
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

  draw() {
    this.edges.forEach((edge) => {
        edge.draw();
    });
  }
    static getFor(edge) {
        
    } 
}