import { StageContainer } from "./core/stage";
import { tween, addUpdateListener } from "./core/tween";

import { LabStage } from "./game/lab";
import { TitleStage } from "./game/title";
import { Text } from "./ui/text";

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

    let title = new TitleStage();
    let lab = new LabStage();
    lab.offset.y = 480;
    stageContainer.add(title);
    stageContainer.add(lab);

    tween(title.offset, { y: -480 }, { duration: 1000 });
    tween(lab.offset, { y: 0 }, { duration: 1000 });
});

window.addEventListener("load", function() {
    stageContainer.requestRedraw();
});
