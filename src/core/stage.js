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
        let evt = new MouseEvent(e.clientX, e.clientY, e.button);

        for (let stage of this.stages) {
            stage.onmousedown(evt);
        }
        this.requestRedraw();
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
    onmousedown(evt) {
        for (let node of this.nodes) {
            if (node.contains(evt.x, evt.y)) {
                node.onmousedown(evt);
            }
        }
    }

    /// Lifecycle methods
    enter() {
    }

    exit() {
    }
}
