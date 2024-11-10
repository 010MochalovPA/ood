import { IFlyBehavior } from "./IFlyBehavior";

function createFlyNoWayBehavior(): IFlyBehavior {
    return {
        get flightCount() {
            return 0;
        },
        fly: () => {
            console.log(`Не умею летать!`);
        },
    }
}


export { createFlyNoWayBehavior };
