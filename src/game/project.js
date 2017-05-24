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
import * as utils from "../utils";
import * as game from "./game";
import { LabStage } from "./lab";

class SpecializationCard extends BorderBox {
    constructor(specialization, level, handler=null) {
        super(new LinearBox([
            new Text(specialization, { size: 18 }),
            new Text(`Level ${level}`, { size: 16 }),
        ], "vertical"));
        this.topic = specialization;
        this.handler = handler;
        this.highlighted = false;
    }

    onclick() {
        if (this.handler) {
            this.handler(this);
        }
    }

    highlight() {
        this.fillColor = "#00F";
        this.highlighted = true;
    }

    unhighlight() {
        this.fillColor = null;
        this.highlighted = false;
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

                this.updateIdeaPreview();
            };
        };

        this.specializations = new LinearBox([], "horizontal");
        let specializationsHandler = makeHandler(this.specializations);
        let cards = Object.entries(this.state.professor.specializations).map(([specialization, level]) => {
            return new SpecializationCard(specialization, level, specializationsHandler);
        });
        this.specializations.addAll(cards);
        container.add(this.specializations);

        container.add(new Text("[Optional] Choose a second topic:"));
        this.subtopics = new LinearBox([], "horizontal");
        let subtopicsHandler = makeHandler(this.subtopics);
        let cards2 = Object.keys(game.Project.PRIMARY)
            .filter((s) => !this.state.professor.specializations[s])
            .map((specialization) => {
                return new SpecializationCard(specialization, 0, subtopicsHandler);
            });
        this.subtopics.addAll(cards2);
        container.add(this.subtopics);

        this.ideaPreview = new Text("");
        container.add(new LinearBox([new Text("Your project idea: "), this.ideaPreview], "horizontal"));

        this.add(container);
    }

    updateIdeaPreview() {
        let topic = this.specializations.children.find((n) => n.highlighted);
        let subtopic = this.subtopics.children.find((n) => n.highlighted);

        if (!topic) return;

        topic = topic.topic;

        if (subtopic) subtopic = subtopic.topic;

        const topicChoices = game.Project.PRIMARY[topic].base;

        // TODO: only change base topic when base topic selection changed
        let idea = utils.choice(topicChoices);
        if (subtopic) {
            let subtopicChoices = game.Project.PRIMARY[subtopic].modifier;
            idea = `${utils.choice(subtopicChoices)} ${idea}`;
        }

        this.ideaPreview.text = idea;
    }
}
