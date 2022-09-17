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
    return this.vertexes.have(vertex);
  }

  hasE(edge) {
    for(let e of this.edges) {
      if(e.equals(edge)) {
        return true;
      }
    }
    return false;
  }


  getCenter() {
    const arr = Array.from(this.vertexes);
    const gx = arr.reduce((acc, cur) => acc + cur.x, 0) / arr.length;
    const gy = arr.reduce((acc, cur) => acc + cur.y, 0) / arr.length;

    return new Vertex(gx, gy);
}

  static getElementCyclic(set, iterator) {
    if(iterator.next().done) {
      iterator = set[Symbol.iterator]();
    }
    return iterator.next().value;
  }

  // draw() {
  //   this.vertexes.forEach((vertex) => {
  //     vertex.draw();
  //   });
  //   this.edges.forEach((edge) => {
  //     edge.draw();
  //   });
  // }
}