import { FlyBehavior } from "../../behavior/fly/FlyBehavior";

class MockNoFlyBehavior extends FlyBehavior {
    fly(): void {
        // Мок реализация полета
    }
}

export { MockNoFlyBehavior };