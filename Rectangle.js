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

    draw() {
        const arr = Array.from(this.vertexes);
        fill(color(255, 0, 255));
        quad(arr[0].x, arr[0].y, arr[1].x, arr[1].y, arr[2].x, arr[2].y, arr[3].x, arr[3].y);
    }
}
