class Triangle extends Polygon {
    constructor(v1, v2, v3) {
        const e1 = new Edge(v1, v2);
        const e2 = new Edge(v2, v3);
        const e3 = new Edge(v3, v1);
        super(new Set([v1, v2, v3]), new Set([e1, e2, e3]));
    }

    draw() {
        const arr = Array.from(this.vertexes);
        fill("yellow");
        triangle(arr[0].x, arr[0].y, arr[1].x, arr[1].y, arr[2].x, arr[2].y);
    }

}