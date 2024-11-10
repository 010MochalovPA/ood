import { Duck } from "../../duck/Duck";
import { MockDanceBehavior } from "./MockDanceBehavior";

class MockDuck extends Duck {
    constructor() {
        super(new MockDanceBehavior());
    }

    display(): void {
        console.log("Я мок-утка!");
    }
}

export { MockDuck }