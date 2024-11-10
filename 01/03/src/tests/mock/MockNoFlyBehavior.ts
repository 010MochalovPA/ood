import { IFlyBehavior } from "../../behavior/fly/IFlyBehavior";

function createMockNoFlyBehavior(): IFlyBehavior {
    return {
        get flightCount() {
            return 0;
        },
        fly: () => {},
    };
}

export { createMockNoFlyBehavior };