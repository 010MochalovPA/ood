import { IFlyBehavior } from "./IFlyBehavior";

function createFlyWithWingsBehavior(): IFlyBehavior {
    let flightCount: number = 0;

    return {
        get flightCount() {
            return flightCount;
        },
        fly: () => {
            flightCount++;
            console.log(`Летаю! Полет номер: ${flightCount}`);
        },
    };
}


export { createFlyWithWingsBehavior };
