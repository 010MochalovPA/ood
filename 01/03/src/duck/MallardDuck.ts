import { Duck } from "./Duck";
import { createWaltzDanceBehavior } from "../behavior/dance/createWaltzDanceBehavior";
import { createQuackBehavior } from "../behavior/quack/createQuackBehavior";
import { createFlyWithWingsBehavior } from "../behavior/fly/createFlyWithWingsBehavior";

class MallardDuck extends Duck {
    constructor() {
        super({
            danceBehavior: createWaltzDanceBehavior(),
            flyBehavior: createFlyWithWingsBehavior(),
            quackBehavior: createQuackBehavior(),
        });
    }

    public display(): void {
        console.log("Я кряква!");
    }
}

export { MallardDuck }