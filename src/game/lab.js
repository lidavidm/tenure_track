import { Point, Rect } from "../core/node";
import { Stage } from "../core/stage";
import { BorderBox, LinearBox } from "../ui/containers";
import { Text } from "../ui/text";

export class LabStage extends Stage {
    constructor(state) {
        super();
        this.state = state;
    }

    enter() {
        super.enter();

        let title = new Text("1 The Research Lab");
        this.title = new BorderBox(new LinearBox([title], "horizontal"));
        title.fontStyle = "bold";
        this.title.child.size = new Rect(this.boundingSize.w, "auto");
        this.add(this.title);

        this.options = new LinearBox([
            new Text("Recruit Students"),
            new Text("Start Project"),
        ], "horizontal");
        this.options.anchor = new Point(0, 1);
        this.options.pos = new Point(0, this.boundingSize.h);
        this.add(this.options);

        let profName = new Text(this.state.professor.name);
        let profTitle = new Text(this.state.professor.year);
        profName.pos = new Point(0, this.title.absolutePos.y + this.title.absoluteSize.h);
        profName.fontSize = 32;
        profTitle.pos = new Point(0, 256);
        profTitle.fontSize = 16;

        this.add(profName);
        this.add(profTitle);
    }
}
