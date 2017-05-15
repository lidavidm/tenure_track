/*********************************************************************
 * Copyright © 2017 David Li
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you
 * may not use this file except in compliance with the License.  You
 * may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied.  See the License for the specific language governing
 * permissions and limitations under the License.
 ********************************************************************/
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
        this._stage = null;
        this.parent = null;
        this.children = [];
        this._pos = new Point(0, 0);
        this._size = new Rect(0, 0);
        this.anchor = new Point(0, 0);
    }

    get stage() {
        if (this._stage) return this._stage;
        if (this.parent) return this.parent.stage;
        return null;
    }

    set stage(stage) {
        this._stage = stage;
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

    get absoluteSize() {
        // TODO:
        return this.size;
    }

    attr(attr, value) {
        this[attr] = value;
        return this;
    }

    contains(x, y) {
        let ap = this.absolutePos;
        let as = this.absoluteSize;
        return x >= ap.x && x <= ap.x + as.w && y >= ap.y && y <= ap.y + as.h;
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
        node.parent = this;
        this.children.push(node);
    }

    removeAll() {
        for (let child of this.children) {
            child.parent = null;
        }
        this.children = [];
    }

    onmousedown(evt) {
        for (let child of this.children) {
            if (child.contains(evt.x, evt.y)) {
                child.onmousedown(evt);
                break;
            }
        }
    }
}
