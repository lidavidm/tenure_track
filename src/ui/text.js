import { Node, Rect } from "../core/node";

export class Text extends Node {
    constructor(text, color="#000", family="Latin Modern Roman", size=30) {
        super();
        this.text = text;
        this.color = color;
        this.family = family;
        this.fontSize = size;
        this.fontStyle = "";
    }

    get size() {
        let ctx = this.stage.ctx;

        this.setupText(ctx);
        let measured = ctx.measureText(this.text);
        return new Rect(measured.width, 1.5 * this.fontSize);
    }

    set size(_) {
        console.error("Cannot set size of ui.Text");
    }

    setupText(ctx) {
        ctx.textBaseline = "top";
        ctx.fillStyle = this.color;
        ctx.font = `${this.fontStyle} ${this.fontSize}px ${this.family}`;
    }

    drawBackground(ctx, pos, boundingSize) {
        this.setupText(ctx);
        ctx.fillText(this.text, pos.x, pos.y);
    }
}
