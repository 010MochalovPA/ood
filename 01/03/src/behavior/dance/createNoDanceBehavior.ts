import { IDanceBehavior } from "./IDanceBehavior";

function createNoDanceBehavior(): IDanceBehavior {
    return () => {
        console.log("Не умею танцевать!");
    }
}

export { createNoDanceBehavior };