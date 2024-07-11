class StopEditor {
  constructor(viewport, world) {
    this.viewport = viewport;
    this.world = world;

    this.canvas = viewport.canvas;
    this.ctx = this.canvas.getContext("2d");
  }

  enable() {
    this.#addEventListeners();
  }

  disable() {
    this.#removeEventListeners();
  }

  #addEventListeners() {
    this.controller = new AbortController();
    this.canvas.addEventListener(
      "mousedown",
      this.#handleMouseDown.bind(this),
      { signal: this.controller.signal }
    );
    this.canvas.addEventListener(
      "mousemove",
      this.#handleMouseMove.bind(this),
      { signal: this.controller.signal }
    );
    this.canvas.addEventListener("contextmenu", (evt) => evt.preventDefault(), {
      signal: this.controller.signal,
    });
    this.canvas.addEventListener("mouseup", () => (this.dragging = false), {
      signal: this.controller.signal,
    });
  }

  #removeEventListeners() {
    this.controller.abort();
  }
}
