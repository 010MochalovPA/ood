import { IFlyBehavior } from "./IFlyBehavior";

abstract class FlyBehavior implements IFlyBehavior {
      protected _flightCount: number = 0;

      get flightCount(): number {
          return this._flightCount;
      }

      abstract fly(): void;

      protected _increaseFlightCount(): void {
          this._flightCount++;
      }
}

export { FlyBehavior };
