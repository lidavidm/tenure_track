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

        this.professor = new BorderBox(new LinearBox([
            new Text(this.state.professor.name),
            new Text(this.state.professor.year, { size: 20 }),
        ], "vertical"));
        this.professor.child.size = new Rect(this.boundingSize.w, "auto");
        this.professor.pos = new Point(0, this.title.absolutePos.y + this.title.absoluteSize.h);
        this.add(this.professor);

        this.projects = new LinearBox([], "vertical");
        this.projects.pos = new Point(0, this.professor.absolutePos.y + this.professor.absoluteSize.h);

        let projectStyle = { size: 24 };
        for (let project of this.state.projects) {
            this.projects.add(new Text(project.name, projectStyle));
        }

        this.add(this.projects);
    }
}
