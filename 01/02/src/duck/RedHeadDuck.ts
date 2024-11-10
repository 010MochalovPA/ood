import { Duck } from "./Duck";
import { MinuetDanceBehavior } from "../behavior/dance/MinuetDanceBehavior";
import { FlyWithWingsBehavior } from "../behavior/fly/FlyWithWingsBehavior";
import { QuackBehavior } from "../behavior/quack/QuackBehavior";

class RedHeadDuck extends Duck {
    constructor() {
        super({
            danceBehavior: new MinuetDanceBehavior(),
            flyBehavior: new FlyWithWingsBehavior(),
            quackBehavior: new QuackBehavior(),
        });
    }

    public display(): void {
        console.log("Я красноголовая утка!");
    }
}

export { RedHeadDuck }