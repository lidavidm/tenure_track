import { Point, Rect } from "../core/node";
import { Stage } from "../core/stage";
import { BorderBox, LinearBox } from "../ui/containers";
import { Text } from "../ui/text";

export class LabStage extends Stage {
    enter() {
        let title = new Text("1 The Research Lab");
        this.title = new BorderBox(new LinearBox([title], "horizontal"));
        title.fontStyle = "bold";
        this.title.child.size = new Rect(this.boundingSize.w, "auto");

        this.options = new LinearBox([
            new Text("Recruit Students"),
            new Text("Start Project"),
        ], "horizontal");
        this.options.anchor = new Point(0, 1);
        this.options.pos = new Point(0, this.boundingSize.h);

        let test1 = new Text("Figure 1. Current students");
        let test1sub = new Text("See Section 1.1 for full roster");
        test1.pos = new Point(0, 240);
        test1.fontSize = 16;
        test1sub.pos = new Point(0, 256);
        test1sub.fontSize = 16;
        let test2 = new Text("Figure 2. Current projects");
        test2.pos = new Point(320, 240);
        test2.fontSize = 16;

        this.add(this.title);
        this.add(this.options);
        this.add(test1);
        this.add(test1sub);
        this.add(test2);
    }
}
