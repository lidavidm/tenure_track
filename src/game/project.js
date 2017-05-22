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

class SpecializationCard extends BorderBox {
    constructor(specialization, level, handler=null) {
        super(new LinearBox([
            new Text(specialization, { size: 18 }),
            new Text(`Level ${level}`, { size: 16 }),
        ], "vertical"));
        this.handler = handler;
    }

    onclick() {
        if (this.handler) {
            this.handler(this);
        }
    }

    highlight() {
        this.fillColor = "#00F";
    }

    unhighlight() {
        this.fillColor = null;
    }
}

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

        container.add(new Text("Choose a base topic:"));

        let makeHandler = (group) => {
            return (card) => {
                group.children.forEach((c) => c.unhighlight());
                card.highlight();
            };
        };

        let specializations = new LinearBox([], "horizontal");
        let specializationsHandler = makeHandler(specializations);
        let cards = Object.entries(this.state.professor.specializations).map(([specialization, level]) => {
            return new SpecializationCard(specialization, level, specializationsHandler);
        });
        specializations.addAll(cards);
        container.add(specializations);

        container.add(new Text("[Optional] Choose a second topic:"));
        let subtopics = new LinearBox([], "horizontal");
        let subtopicsHandler = makeHandler(subtopics);
        let cards2 = game.Project.PRIMARY
            .filter((s) => !this.state.professor.specializations[s])
            .map((specialization) => {
                return new SpecializationCard(specialization, 0, subtopicsHandler);
            });
        subtopics.addAll(cards2);
        container.add(subtopics);

        this.add(container);
    }
}
