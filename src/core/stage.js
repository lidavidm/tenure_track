import { Point } from "./node";

class Event {
    constructor() {

    }
}

class MouseEvent extends Event {
    constructor(x, y, button) {
        super();
        this.x = x;
        this.y = y;
        this.button = button;
    }
}
MouseEvent.BUTTON_LEFT = 0;

export class StageContainer {
    constructor(ctx) {
        this.ctx = ctx;
        this.stages = [];
        this._needsRedraw = false;

        this.eventHandlers = {
            "mousedown": this.onmousedown.bind(this),
        };

        for (let [event, handler] of Object.entries(this.eventHandlers)) {
            this.ctx.canvas.addEventListener(event, handler);
        }

        // for (let [event, handler] of Object.entries(this.eventHandlers)) {
        //     this.ctx.canvas.removeEventListener(event, handler);
        // }
    }

    get boundingSize() {
        return {
            w: this.ctx.canvas.clientWidth,
            h: this.ctx.canvas.clientHeight,
        };
    }

    add(stage) {
        this.stages.push(stage);
        stage.container = this;
        stage.ctx = this.ctx;
        stage.enter();
        this.requestRedraw();
    }

    update() {
        for (let stage of this.stages) {
            stage.update();
        }
    }

    draw() {
        this.update();

        this.ctx.clearRect(0, 0, this.boundingSize.w, this.boundingSize.h);
        this.ctx.fillStyle = "#FFF";
        this.ctx.fillRect(0, 0, this.boundingSize.w, this.boundingSize.h);

        for (let stage of this.stages) {
            this.ctx.save();
            stage.draw();
            this.ctx.restore();
        }

        this._needsRedraw = false;
    }

    requestRedraw() {
        if (!this._needsRedraw) {
            this._needsRedraw = true;
            window.requestAnimationFrame(this.draw.bind(this));
        }
    }

    /// Event handlers
    onmousedown(e) {
        this.requestRedraw();
        let evt = new MouseEvent(e.clientX, e.clientY, e.button);

        for (let stage of this.stages) {
            stage.onmousedown(evt);
        }
    }
}

export class Stage {
    constructor() {
        this.ctx = null;
        this.nodes = [];
        this.offset = new Point(0, 0);
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
        this.ctx.translate(this.offset.x, this.offset.y);

        for (let node of this.nodes) {
            node.draw(this.ctx);
        }
    }

    add(child) {
        child.stage = this;
        this.nodes.push(child);
    }

    /// Event handlers
    onmousedown() {

    }

    /// Lifecycle methods
    enter() {
    }

    exit() {
    }
}
