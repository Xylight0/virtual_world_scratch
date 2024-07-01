class Segment {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  length() {
    return distance(this.p1, this.p2);
  }

  //Check if both points are already available
  equals(seg) {
    return this.includes(seg.p1) && this.includes(seg.p2);
  }

  //Checks if point === p1 or point === p2
  /*
  [
  Segment[Point[100, 200], Point[200, 300]]],
  Segment[Point[300, 200], Point[300, 300]]],
  Segment[Point[300, 200], Point[300, 300]]],
  Segment[Point[300, 300], Point[300, 200]]],
  ]
  */
  includes(point) {
    return this.p1.equals(point) || this.p2.equals(point);
  }

  draw(ctx, { width = 2, color = "black", dash = [] } = {}) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.setLineDash(dash);
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}
