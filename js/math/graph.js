class Graph {
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }

  static load(info) {
    const points = info.points.map(
      (pointInfo) => new Point(pointInfo.x, pointInfo.y)
    );
    const segments = info.segments.map((segInfo) => {
      return new Segment(
        points.find((p) => p.equals(segInfo.p1)),
        points.find((p) => p.equals(segInfo.p2))
      );
    });
    return new Graph(points, segments);
  }

  addPoint(point) {
    this.points.push(point);
  }

  tryAddPoint(point) {
    if (this.containsPoint(point)) return false;
    this.addPoint(point);
    return true;
  }

  containsPoint(point) {
    return this.points.find((p) => p.equals(point));
  }

  removePoint(point) {
    const segs = this.getSegmentWithPoint(point);
    for (const seg of segs) {
      this.removeSegment(seg);
    }
    this.points = this.points.filter((p) => !p.equals(point));
  }

  getSegmentWithPoint(point) {
    return this.segments.filter((seg) => seg.includes(point));
  }

  addSegment(seg) {
    this.segments.push(seg);
  }

  tryAddSegment(seg) {
    if (
      this.points.length < 1 ||
      this.containsSegment(seg) ||
      seg.p1.equals(seg.p2)
    )
      return false;
    this.segments.push(seg);
    return true;
  }

  containsSegment(seg) {
    return this.segments.find((s) => s.equals(seg));
  }

  removeSegment(seg) {
    this.segments = this.segments.filter((s) => !s.equals(seg));
  }

  clear() {
    this.points.length = 0;
    this.segments.length = 0;
  }

  draw(ctx) {
    for (const seg of this.segments) {
      seg.draw(ctx);
    }

    for (const point of this.points) {
      point.draw(ctx);
    }
  }
}
