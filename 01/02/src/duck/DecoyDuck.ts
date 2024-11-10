import { Duck } from "./Duck";
import { NoDanceBehavior } from "../behavior/dance/NoDanceBehavior";
import { FlyNoWayBehavior } from "../behavior/fly/FlyNoWayBehavior";
import { MuteQuackBehavior } from "../behavior/quack/MuteQuackBehavior";

class DecoyDuck extends Duck {
    constructor() {
        super({
            danceBehavior: new NoDanceBehavior(),
            flyBehavior: new FlyNoWayBehavior(),
            quackBehavior: new MuteQuackBehavior(),
        });
    }
    
    public display(): void {
        console.log("Я искусственная утка!");
    }
}

export { DecoyDuck }