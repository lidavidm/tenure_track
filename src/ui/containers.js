import { Node, Point, Rect } from "../core/node";

export class BorderBox extends Node {
    constructor(child, borders=null) {
        super();
        this.add(child);
        this.child = child;
        this.borderColor = "#000";

        if (!borders) {
            this.borders = {
                top: 1,
                bottom: 1,
                left: 1,
                right: 1,
            };
        }
        else {
            this.borders = borders;
        }
    }

    get size() {
        return this.child.size;
    }

    drawBackground(ctx, pos, boundingSize) {
        ctx.lineWidth = this.borders.bottom;
        ctx.strokeStyle = this.borderColor;
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y + boundingSize.h);
        ctx.lineTo(pos.x + boundingSize.w, pos.y + boundingSize.h);
        ctx.stroke();
    }
}

export class LinearBox extends Node {
    constructor(children, direction) {
        super();

        this.sticky = 0.0;

        children.forEach((n) => this.add(n));
        this.direction = direction;
        this._size = null;
    }

    get size() {
        let result = new Rect(0, 0);

        for (let child of this.children) {
            let childSize = child.size;

            if (this.direction === "horizontal") {
                result.w += childSize.w;
                result.h = Math.max(result.h, childSize.h);
            }
            else {
                result.w = Math.max(result.w, childSize.w);
                result.h += childSize.h;
            }
        }

        if (this._size) {
            if (typeof this._size.w === "number") {
                result.w = this._size.w;
            }
            if (typeof this._size.h === "number") {
                result.h = this._size.h;
            }
        }

        return result;
    }

    set size(s) {
        this._size = s;
    }

    update() {
        super.update();

        let startingPos = new Point(0, 0);
        for (let child of this.children) {
            child.pos = startingPos.clone();

            if (this.direction === "horizontal") {
                startingPos.x += child.size.w;
            }
            else {
                startingPos.y += child.size.h;
            }
        }
    }
}
