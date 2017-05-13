import { Node, Rect } from "../core/node";

const LINE_HEIGHT = 1.25;

export class Text extends Node {
    constructor(text, options={}) {
        super();
        this.text = text;
        this.color = options.color || "#000";
        this.family = options.family || "Latin Modern Roman";
        this.fontSize = options.size || 30;
        this.fontStyle = "";
    }

    get size() {
        let ctx = this.stage.ctx;

        this.setupText(ctx);
        let measured = ctx.measureText(this.text);
        return new Rect(measured.width, LINE_HEIGHT * this.fontSize);
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
        ctx.fillText(this.text, pos.x, pos.y + (LINE_HEIGHT - 1) * this.fontSize);
    }
}

export class TextButton extends Text {

}
