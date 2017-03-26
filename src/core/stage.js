export class Stage {
    constructor(ctx) {
        this.ctx = ctx;
        this.nodes = [];

        this.eventHandlers = {
            "mousedown": this.onmousedown.bind(this),
        };

        this._needsRedraw = false;
    }

    get boundingSize() {
        return {
            w: this.ctx.canvas.clientWidth,
            h: this.ctx.canvas.clientHeight,
        };
    }

    update() {
        for (let child of this.nodes) {
            child.update();
        }
    }

    draw() {
        this.update();

        this.ctx.clearRect(0, 0, this.boundingSize.w, this.boundingSize.h);
        this.ctx.fillStyle = "#FFF";
        this.ctx.fillRect(0, 0, this.boundingSize.w, this.boundingSize.h);
        for (let node of this.nodes) {
            node.draw(this.ctx);
        }

        this._needsRedraw = false;
    }

    requestRedraw() {
        if (!this._needsRedraw) {
            this._needsRedraw = true;
            window.requestAnimationFrame(this.draw.bind(this));
        }
    }

    add(child) {
        child.stage = this;
        this.nodes.push(child);
    }

    /// Event handlers
    onmousedown(e) {
        this.requestRedraw();
    }

    /// Lifecycle methods
    enter() {
        for (let [event, handler] of Object.entries(this.eventHandlers)) {
            this.ctx.canvas.addEventListener(event, handler);
        }
    }

    exit() {
        for (let [event, handler] of Object.entries(this.eventHandlers)) {
            this.ctx.canvas.removeEventListener(event, handler);
        }
    }
}
