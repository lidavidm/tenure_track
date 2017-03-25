export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(other) {
        return new Point(this.x + other.x, this.y + other.y);
    }

    clone() {
        return new Point(this.x, this.y);
    }
}

export class Rect {
    constructor(w, h) {
        this.w = w;
        this.h = h;
    }

    clone() {
        return new Rect(this.w, this.h);
    }
}

export class Node {
    constructor() {
        this.stage = null;
        this.parent = null;
        this.children = [];
        this._pos = new Point(0, 0);
        this._size = new Rect(0, 0);
        this.anchor = new Point(0, 0);
    }

    get pos() {
        return this._pos;
    }

    set pos(p) {
        this._pos = p;
    }

    get size() {
        return this._size;
    }

    set size(s) {
        this._size = s;
    }

    get absolutePos() {
        let pos;
        let size = this.size;
        if (this.parent) {
            pos = this.parent.absolutePos.add(this.pos).clone();
        }
        else {
            pos = this.pos.clone();
        }
        pos.x -= this.anchor.x * size.w;
        pos.y -= this.anchor.y * size.h;

        return pos;
    }

    attr(attr, value) {
        this[attr] = value;
        return this;
    }

    update() {
        for (let child of this.children) {
            child.parent = this;
            child.stage = this.stage;
            child.update();
        }
    }

    draw(ctx) {
        // TODO: use absolute
        let pos = this.absolutePos.clone();
        let size = this.size.clone();

        ctx.save();

        this.drawBackground(ctx, pos, size);

        for (let child of this.children) {
            child.draw(ctx);
        }

        ctx.restore();
    }

    drawBackground(ctx, pos, boundingSize) {

    }

    add(node) {
        this.children.push(node);
    }
}
