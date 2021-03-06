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
import { Node, Rect } from "../core/node";
import { BorderBox } from "./containers";

const LINE_HEIGHT = 1.25;

let SIZE_CACHE = {};

// Needed because Chrome loads fonts weirdly; depending on the order
// of events, fonts might not be loaded when DOMContentLoaded is
// fired. Unfortunately, this means the size cache will contain the
// wrong font.
export function __clearSizeCache() {
    SIZE_CACHE = {};
}

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
        const cacheKey = `${this.family} ${this.fontSize} ${this.text}`;
        if (SIZE_CACHE[cacheKey]) {
            return SIZE_CACHE[cacheKey];
        }
        let ctx = this.stage.ctx;

        this.setupText(ctx);
        let measured = ctx.measureText(this.text);
        let result   = new Rect(measured.width, LINE_HEIGHT * this.fontSize);
        SIZE_CACHE[cacheKey] = result;
        return result;
    }

    set size(_) {
        console.error("Cannot set size of ui.Text");
    }

    setupText(ctx) {
        // ctx.textBaseline = "top" renders differently between Chrome
        // and Firefox. See FF bug #737852.
        ctx.fillStyle = this.color;
        ctx.font = `${this.fontStyle} ${this.fontSize}px ${this.family}`;
    }

    drawBackground(ctx, pos, boundingSize) {
        // Manually adjust the text position since we can't use the
        // textBaseline property.
        this.setupText(ctx);
        ctx.fillText(this.text, pos.x, pos.y + (0.95 * LINE_HEIGHT) * this.fontSize);
    }
}

export class TextButton extends BorderBox {
    constructor(text, callback, options={}) {
        options.size = options.size || 24;
        super(new Text(text, options), {
            left: 1,
            right: 1,
            top: 1,
            bottom: 1,
        });
        this.strokeColor = options.strokeColor || "#00F";
        this.callback = callback;
    }

    onmousedown(evt) {
        this.callback();
    }
}
