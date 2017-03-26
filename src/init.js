import { LabStage } from "./game/lab";
import { TitleStage } from "./game/title";
import { Text } from "./ui/text";

let stage;

// We need to listen to both, else for whatever reason Chrome fires
// onload before all stylesheets are loaded
window.addEventListener("DOMContentLoaded", function() {
    let canvas = document.querySelector("#canvas");
    // Request an opaque context for antialiased text
    let context = canvas.getContext("2d", { alpha: false });

    stage = new TitleStage(context);
    // let stage = new LabStage(context);
    stage.enter();

    stage.requestRedraw();

});

window.addEventListener("load", function() {
    stage.requestRedraw();
});
