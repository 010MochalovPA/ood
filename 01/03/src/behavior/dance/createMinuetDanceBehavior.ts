import { IDanceBehavior } from "./IDanceBehavior";

function createMinuetDanceBehavior(): IDanceBehavior {
    return () => {
        console.log("Танцую менуэт!");
    }
}

export { createMinuetDanceBehavior };