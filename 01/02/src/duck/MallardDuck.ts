import { Duck } from "./Duck";
import { WaltzDanceBehavior } from "../behavior/dance/WaltzDanceBehavior";
import { FlyWithWingsBehavior } from "../behavior/fly/FlyWithWingsBehavior";
import { QuackBehavior } from "../behavior/quack/QuackBehavior";

class MallardDuck extends Duck {
    constructor() {
        super({
            danceBehavior: new WaltzDanceBehavior(),
            flyBehavior: new FlyWithWingsBehavior(),
            quackBehavior: new QuackBehavior(),
        });
    }

    public display(): void {
        console.log("Я кряква!");
    }
}

export { MallardDuck }