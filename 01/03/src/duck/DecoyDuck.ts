import { Duck } from "./Duck";
import { createNoDanceBehavior } from "../behavior/dance/createNoDanceBehavior";
import { createFlyNoWayBehavior } from "../behavior/fly/createFlyNoWayBehavior";
import { createMuteQuackBehavior } from "../behavior/quack/MuteQuackBehavior";

class DecoyDuck extends Duck {
    constructor() {
        super({
            danceBehavior: createNoDanceBehavior(),
            flyBehavior: createFlyNoWayBehavior(),
            quackBehavior: createMuteQuackBehavior(),
        });
    }
    
    public display(): void {
        console.log("Я искусственная утка!");
    }
}

export { DecoyDuck }