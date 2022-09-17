class Rectangle extends Polygon {
    constructor(v1, v2, v3, v4, RGB) {
        const e1 = new Edge(v1, v2);
        const e2 = new Edge(v2, v3);
        const e3 = new Edge(v3, v4);
        const e4 = new Edge(v4, v1);
        super(new Set([v1, v2, v3, v4]), new Set([e1, e2, e3, e4]), RGB);
    }

    draw() {
        const arr = Array.from(this.vertexes);
        fill(color(this.RGB.r, this.RGB.g, this.RGB.b));
        quad(arr[0].x, arr[0].y, arr[1].x, arr[1].y, arr[2].x, arr[2].y, arr[3].x, arr[3].y);
    }
}
