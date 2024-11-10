import { Duck } from "./Duck";
import { createMinuetDanceBehavior } from "../behavior/dance/createMinuetDanceBehavior";
import { createQuackBehavior } from "../behavior/quack/QuackBehavior";
import { createFlyWithWingsBehavior } from "../behavior/fly/createFlyWithWingsBehavior";

class RedHeadDuck extends Duck {
    constructor() {
        super({
            danceBehavior: createMinuetDanceBehavior(),
            flyBehavior: createFlyWithWingsBehavior(),
            quackBehavior: createQuackBehavior(),
        });
    }

    public display(): void {
        console.log("Я красноголовая утка!");
    }
}

export { RedHeadDuck }