import { FlyBehavior } from "../../behavior/fly/FlyBehavior";

class MockFlyBehavior extends FlyBehavior {
    fly(): void {
        this._increaseFlightCount();
    }
}

export { MockFlyBehavior };