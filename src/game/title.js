import { Stage } from "../core/stage";
import { Text } from "../ui/text";

export class TitleStage extends Stage {
    enter() {
        let title = new Text("Tenure Track");
        let subtitle = new Text("A New Method to Transform Undergraduates into Papers");
        let annotation = new Text("#CS Edition");

        let instructions = new Text("Click to start");

        title.anchor.x = 0.5;
        title.pos.x = this.boundingSize.w / 2;
        title.pos.y = this.boundingSize.h / 2 - 100;
        title.fontSize = 50;

        subtitle.anchor.x = 0.5;
        subtitle.pos.x = this.boundingSize.w / 2;
        subtitle.pos.y = this.boundingSize.h / 2;
        subtitle.fontSize = 20;

        annotation.anchor.x = 0.5;
        annotation.pos.x = this.boundingSize.w / 2;
        annotation.pos.y = this.boundingSize.h / 2 - 40;
        annotation.family = "Latin Modern Mono";
        annotation.fontSize = 25;

        instructions.anchor.x = 0.5;
        instructions.pos.x = this.boundingSize.w / 2;
        instructions.pos.y = this.boundingSize.h / 2 + 40;
        instructions.fontSize = 25;

        this.add(title);
        this.add(subtitle);
        this.add(annotation);
        this.add(instructions);
    }
}
