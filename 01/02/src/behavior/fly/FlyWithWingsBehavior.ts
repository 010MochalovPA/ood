import { FlyBehavior } from "./FlyBehavior";

class FlyWithWingsBehavior extends FlyBehavior {
     public fly(): void {
        this._increaseFlightCount();
        console.log(`Летаю! Полет номер: ${this._flightCount}`);
    }
}

export { FlyWithWingsBehavior };
