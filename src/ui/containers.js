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
import { Node, Point, Rect } from "../core/node";

export class HSpacer extends Node {
    constructor(w) {
        super();
        this.size = new Rect(w, 0);
    }
}

export class BorderBox extends Node {
    constructor(child, borders=null) {
        super();
        this.add(child);
        this.child = child;

        // TODO: move common styling to a superclass?
        // TODO: make general stroke/fill objects?
        this.strokeColor = "#000";
        this.fillColor = null;

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
        if (this.fillColor) {
            ctx.fillStyle = this.fillColor;
            ctx.fillRect(pos.x, pos.y, boundingSize.w, boundingSize.h);
        }

        ctx.strokeStyle = this.strokeColor;

        ctx.beginPath();
        if (this.borders.top) {
            ctx.lineWidth = this.borders.top;
            ctx.moveTo(pos.x, pos.y);
            ctx.lineTo(pos.x + boundingSize.w, pos.y);
        }
        if (this.borders.bottom) {
            ctx.lineWidth = this.borders.bottom;
            ctx.moveTo(pos.x, pos.y + boundingSize.h);
            ctx.lineTo(pos.x + boundingSize.w, pos.y + boundingSize.h);
        }
        if (this.borders.left) {
            ctx.lineWidth = this.borders.left;
            ctx.moveTo(pos.x, pos.y);
            ctx.lineTo(pos.x, pos.y + boundingSize.h);
        }
        if (this.borders.right) {
            ctx.lineWidth = this.borders.right;
            ctx.moveTo(pos.x + boundingSize.w, pos.y);
            ctx.lineTo(pos.x + boundingSize.w, pos.y + boundingSize.h);
        }

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
