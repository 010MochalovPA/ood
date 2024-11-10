import { Duck } from "../../duck/Duck";
import { createMockDanceBehavior } from "./MockDanceBehavior";
import { createMockFlyWithWingsBehavior } from "./MockFlyWithWingsBehavior";
import { createMockQuackBehavior } from "./MockQuackBehavior";

class MockDuck extends Duck {
    constructor() {
        super({
            danceBehavior: createMockDanceBehavior(),
            flyBehavior: createMockFlyWithWingsBehavior(),
            quackBehavior: createMockQuackBehavior(),
        });
    }

    display(): void {
        console.log("Я мок-утка!");
    }
}

export { MockDuck }