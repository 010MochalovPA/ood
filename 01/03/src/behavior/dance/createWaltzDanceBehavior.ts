import { IDanceBehavior } from "./IDanceBehavior";

function createWaltzDanceBehavior(): IDanceBehavior {
    return () => {
        console.log("Танцую вальс!");
    }
}

export { createWaltzDanceBehavior };