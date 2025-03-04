class Viewport {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.zoom = 3;
    this.maxZoom = 10;
    this.center = new Point(canvas.width / 2, canvas.height / 2);
    this.currentMouseEvent = null;
    this.offset = scale(this.center, -1);
    this.drag = {
      start: new Point(0, 0),
      end: new Point(0, 0),
      offset: new Point(0, 0),
      active: false,
    };

    this.#addEventListeners();
  }

  getMouse(evt, subtractDragOffset = false) {
    const p = new Point(
      (evt.offsetX - this.center.x) * this.zoom - this.offset.x,
      (evt.offsetY - this.center.y) * this.zoom - this.offset.y
    );
    return subtractDragOffset ? subtract(p, this.drag.offset) : p;
  }

  getOffset() {
    return add(this.offset, this.drag.offset);
  }

  reset() {
    this.ctx.restore();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    this.ctx.translate(this.center.x, this.center.y);
    this.ctx.scale(1 / this.zoom, 1 / this.zoom);
    const offset = this.getOffset();
    ctx.translate(offset.x, offset.y);
  }

  #addEventListeners() {
    this.canvas.addEventListener(
      "mousewheel",
      this.#handleMouseWheel.bind(this)
    );
    window.addEventListener("keydown", this.#handleKeyDown.bind(this));
    this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
    window.addEventListener("keyup", this.#handleKeyUp.bind(this));
  }

  lastMouseEvent = null;

  #handleMouseWheel(evt) {
    const dir = Math.sign(evt.deltaY);
    const step = 0.05;
    this.zoom += dir * step;
    this.zoom = Math.max(1, Math.min(this.maxZoom, this.zoom));
  }

  #handleKeyDown(evt) {
    if (evt.repeat) return;
    if (evt.keyCode == 32) {
      this.drag.start = this.getMouse(this.currentMouseEvent);
      this.drag.active = true;
    }
  }

  #handleMouseMove(evt) {
    this.currentMouseEvent = evt;
    if (this.drag.active) {
      this.drag.end = this.getMouse(evt);
      this.drag.offset = subtract(this.drag.end, this.drag.start);
    }
  }

  #handleKeyUp(evt) {
    if (this.drag.active) {
      this.offset = add(this.offset, this.drag.offset);
      this.drag = {
        start: new Point(0, 0),
        end: new Point(0, 0),
        offset: new Point(0, 0),
        active: false,
      };
    }
  }
}
