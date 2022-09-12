// "directionVec2D" mean normalized vec2D
class Line {
    constructor(vertex, directionVec2D) {
        this.vertex = vertex;
        this.directionVec2D = directionVec2D;
    }

    getCrossVertexTo(line) {
        let param = (line.vertex.getVec2D().getAreaGeneretedBy(line.directionVec2D) - this.vertex.getVec2D().getAreaGeneretedBy(line.directionVec2D)) / this.directionVec2D.getAreaGeneretedBy(line.directionVec2D);
        return new Vertex(this.vertex.x + this.directionVec2D.x * param, this.vertex.y + this.directionVec2D.y * param);
    }

    draw() {
        line(this.vertex.x, this.vertex.y, this.vertex.x + this.directionVec2D.x * INFINITY, this.vertex.y + this.directionVec2D.y * INFINITY);
        const inverseVec = this.directionVec2D.getInverseVec();
        line(this.vertex.x, this.vertex.y, this.vertex.x + inverseVec.x * INFINITY, this.vertex.y + inverseVec.y * INFINITY);
    }

}