import { StageContainer } from "./core/stage";
import { tween, addUpdateListener } from "./core/tween";

import * as game from "./game/game";
import { LabStage } from "./game/lab";
import { TitleStage } from "./game/title";
import { Text } from "./ui/text";

let player = new game.Student(0, "E Andersen", "Asst. Professor", 6);
let state = new game.Lab(player);

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
});

window.addEventListener("load", function() {
    stageContainer.requestRedraw();
});
