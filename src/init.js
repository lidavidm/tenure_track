import { LabStage } from "./game/lab";
import { TitleStage } from "./game/title";
import { Text } from "./ui/text";

let canvas = document.querySelector("#canvas");
// Request an opaque context for antialiased text
let context = canvas.getContext("2d", { alpha: false });

// let stage = new TitleStage(context);
let stage = new LabStage(context);
stage.enter();

let renderLoop = () => {
    stage.update();
    stage.draw();
    window.requestAnimationFrame(renderLoop);
};

renderLoop();
