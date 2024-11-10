import { Duck } from "../../duck/Duck";
import { MockDanceBehavior } from "./MockDanceBehavior";
import { MockFlyBehavior } from "./MockFlyBehavior";
import { MockQuackBehavior } from "./MockQuackBehavior";

class MockDuck extends Duck {
    constructor() {
        super({
            danceBehavior: new MockDanceBehavior(),
            flyBehavior: new MockFlyBehavior(),
            quackBehavior: new MockQuackBehavior(),
        });
    }

    display(): void {
        console.log("Я мок-утка!");
    }
}

export { MockDuck }