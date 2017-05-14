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

export class RecruitStage extends Stage {
    constructor(state) {
        super();
        this.state = state;
    }

    enter() {
        super.enter();

        this.updateStudents();

        let container = new LinearBox([], "vertical");

        // TODO: factor this out into something common
        let title = new Text("1.1 Recruit Research Assistants");
        this.title = new BorderBox(new LinearBox([title], "horizontal"), {
            bottom: 1,
        });
        title.fontStyle = "bold";
        this.title.child.size = new Rect(this.boundingSize.w, "auto");
        container.add(this.title);

        for (let recruit of this.state.recruits) {
            let name = new Text(recruit.name, { size: 24 });
            let button = new TextButton("Recruit", () => {}, { size: 20 });
            button.strokeColor = "#00F";
            let description = new Text(`${recruit.year}—Credit Hours: ${recruit.workUnits}`, { size: 20 });
            container.add(new LinearBox([
                name,
                new LinearBox([button, new HSpacer(10), description], "horizontal"),
            ], "vertical"));
        }

        this.add(container);
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
                "Sophomore",
                Math.ceil(Math.random() * 4),
            ));
        }
    }
}
