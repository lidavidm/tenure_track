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

import { Point, Rect } from "../core/node";
import { Stage } from "../core/stage";
import { BorderBox, LinearBox, HSpacer } from "../ui/containers";
import { Text, TextButton } from "../ui/text";
import * as game from "./game";
import { LabStage } from "./lab";

export class ProjectStartStage extends Stage {
    constructor(state) {
        super();
        this.state = state;
    }

    enter() {
        super.enter();

        let container = new LinearBox([], "vertical");

        this.title = this.makeTitle("2", "Start Research Project");
        container.add(this.title);

        let goback = new TextButton("Return to Lab", () => {
            let lab = new LabStage(this.state);
            this.container.transitionFromTo(this, lab, "above");
        });
        container.add(goback);

        this.add(container);
    }
}
