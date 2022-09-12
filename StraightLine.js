// "directionVec2D" mean normalized vec2D
class StraightLine {
    constructor(vertex, directionVec2D) {
        this.vertex = vertex;
        this.directionVec2D = directionVec2D;
    }

    getCrossVertexTo(straightLine) {
        let param = (straightLine.vertex.getVec2D().getAreaGeneretedBy(straightLine.directionVec2D) - this.vertex.getVec2D().getAreaGeneretedBy(straightLine.directionVec2D)) / this.directionVec2D.getAreaGeneretedBy(straightLine.directionVec2D);
        return new Vertex(this.vertex.x + this.directionVec2D.x * param, this.vertex.y + this.directionVec2D.y * param);
    }

    draw() {
        line(this.vertex.x, this.vertex.y, this.vertex.x + this.directionVec2D.x, this.vertex.y + this.directionVec2D.y);
    }

}