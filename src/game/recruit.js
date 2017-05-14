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
import { BorderBox, LinearBox } from "../ui/containers";
import { Text, TextButton } from "../ui/text";
import * as game from "./game";

export class RecruitStage extends Stage {
    constructor(state) {
        super();
        this.state = state;
    }

    enter() {
        super.enter();

        this.updateStudents();

        // TODO: factor this out into something common
        let title = new Text("1.1 Recruit Research Assistants");
        this.title = new BorderBox(new LinearBox([title], "horizontal"));
        title.fontStyle = "bold";
        this.title.child.size = new Rect(this.boundingSize.w, "auto");
        this.add(this.title);
    }

    /**
     * Updates the list of recruitable students.
     */
    updateStudents() {
        this.state.recruits = [];
        for (let i = 0; i < 10; i++) {
            this.state.recruits.push(new game.Student(
                -1,
                "Test Student",
                "Test Year",
                Math.ceil(Math.random() * 4),
            ));
        }
    }
}
