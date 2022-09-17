class Triangle extends Polygon {
    constructor(v1, v2, v3, e1, e2, e3) {
        let vertexes = new Set();
        vertexes.add(v1);
        vertexes.add(v2);
        vertexes.add(v3);
        let edges = new Set();
        edges.add(e1);
        edges.add(e2);
        edges.add(e3);
        super(vertexes, edges);
    }


    

    draw() {
        const arr = Array.from(this.vertexes);
        fill("yellow");
        triangle(arr[0].x, arr[0].y, arr[1].x, arr[1].y, arr[2].x, arr[2].y);
    }

   

}