export class Stage {
    constructor(ctx) {
        this.ctx = ctx;
        this.nodes = [];
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
        this.ctx.clearRect(0, 0, this.boundingSize.w, this.boundingSize.h);
        this.ctx.fillStyle = "#FFF";
        this.ctx.fillRect(0, 0, this.boundingSize.w, this.boundingSize.h);
        for (let node of this.nodes) {
            node.draw(this.ctx);
        }
    }

    add(child) {
        child.stage = this;
        this.nodes.push(child);
    }

    /// Lifecycle methods
    enter() {}
    exit() {}
}
