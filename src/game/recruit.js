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

export class RecruitStage extends Stage {
    constructor(state) {
        super();
        this.state = state;
    }

    enter() {
        super.enter();

        this.updateStudents();

        let container = new LinearBox([], "vertical");

        this.title = this.makeTitle("1.1", "Recruit Research Assistants");
        container.add(this.title);

        this.studentList = new LinearBox([], "vertical");
        container.add(this.studentList);
        this.updateList();

        let goback = new TextButton("Return to Lab", () => {
            let lab = new LabStage(this.state);
            this.container.transitionFromTo(this, lab, "above");
        });
        container.add(goback);

        this.add(container);
    }

    updateList() {
        this.studentList.removeAll();
        for (let recruit of this.state.recruits) {
            let name = new Text(recruit.name, { size: 24 });
            let button = new TextButton("Recruit", () => {
                let idx = this.state.recruits.indexOf(recruit);
                if (idx === -1) {
                    console.warn("Tried to recruit nonexistent student", recruit);
                    return;
                }

                this.state.recruits.splice(idx, 1);
                // TODO: update their ID
                this.state.students.push(recruit);
                this.updateList();
            }, { size: 20 });
            let description = new Text(`${recruit.year}—Credit Hours: ${recruit.workUnits}`, { size: 20 });
            this.studentList.add(new LinearBox([
                name,
                new LinearBox([button, new HSpacer(10), description], "horizontal"),
            ], "vertical"));
        }
    }

    /**
     * Updates the list of recruitable students.
     */
    updateStudents() {
        this.state.recruits = [];
        for (let i = 0; i < 5; i++) {
            this.state.recruits.push(new game.Student(
                -1,
                "Test Student",
                "Sophomore",
                Math.ceil(Math.random() * 4),
            ));
        }
    }
}
