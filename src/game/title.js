import { Stage } from "../core/stage";
import { LinearBox } from "../ui/containers";
import { Text } from "../ui/text";

export class TitleStage extends Stage {
    enter() {
        let title = new Text("Tenure Track");
        let subtitle = new Text("A New Method to Transform Undergraduates into Papers");
        let annotation = new Text("#CS Edition");

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

        let saveGames = new LinearBox([], "vertical");
        saveGames.anchor.x = 0.5;
        saveGames.pos.x = this.boundingSize.w / 2;
        saveGames.pos.y = this.boundingSize.h / 2 + 40;

        let instructions = new Text("1. Begin new paper");
        instructions.fontSize = 25;
        saveGames.add(instructions);

        let testGame = new Text("2. by Prof. Michael Mauer");
        testGame.fontSize = 25;
        saveGames.add(testGame);

        this.add(title);
        this.add(subtitle);
        this.add(annotation);
        this.add(saveGames);
    }
}
