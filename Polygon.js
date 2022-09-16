class Polygon {
  constructor(vertexes, edges) {
    Object.defineProperty(
      this,
      'vertexes', {
        value: vertexes
      }
    );
    Object.defineProperty(
      this,
      'edges', {
        value: edges
      }
    );
  }

  hasV(vertex) {
    return this.vertexes.has(vertex);
  }

  hasE(edge) {
    return this.edges.has(edge);
  }

  static getElementCyclic(set, iterator) {
    if(iterator.next().done) {
      iterator = set[Symbol.iterator]();
    }
    return iterator.next().value;
  }

  draw() {
    this.vertexes.forEach((vertex) => {
      vertex.draw();
    });
    this.edges.forEach((edge) => {
        edge.draw();
    });
  }
}