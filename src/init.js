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
import { StageContainer } from "./core/stage";
import { tween, addUpdateListener } from "./core/tween";

import * as game from "./game/game";
import { LabStage } from "./game/lab";
import { TitleStage } from "./game/title";
import { Text, __clearSizeCache } from "./ui/text";

let player = new game.Student(0, "E Andersen", "Asst. Professor", 6);
player.addSpecialization("educational technology");
let state = new game.Lab(player);
state.projects.push(new game.Project("Reduct", 0, {}));
state.students.push(new game.Student(1, "M Mauer", "Junior", 2));

let stageContainer;

// We need to listen to both, else for whatever reason Chrome fires
// onload before all stylesheets are loaded
window.addEventListener("DOMContentLoaded", function() {
    let canvas = document.querySelector("#canvas");
    // Request an opaque context for antialiased text
    let context = canvas.getContext("2d", { alpha: false });

    stageContainer = new StageContainer(context);

    addUpdateListener(function() {
        stageContainer.draw();
    });

    let lab = new LabStage(state);
    stageContainer.add(lab);
    stageContainer.onresize();
});

window.addEventListener("load", function() {
    __clearSizeCache();
    stageContainer.requestRedraw();
});
