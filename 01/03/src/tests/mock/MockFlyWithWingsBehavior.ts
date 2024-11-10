import { IFlyBehavior } from "../../behavior/fly/IFlyBehavior";

function createMockFlyWithWingsBehavior(): IFlyBehavior {
    let flightCount: number = 0;

    return {
        get flightCount() {
            return flightCount;
        },
        fly: () => {
            flightCount++;
        },
    };
}

export { createMockFlyWithWingsBehavior };