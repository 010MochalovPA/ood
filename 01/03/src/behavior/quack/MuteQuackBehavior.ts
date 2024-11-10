import { IQuackBehavior } from "./IQuackBehavior";

function createMuteQuackBehavior(): IQuackBehavior {
    return () => {
        // Молчание
    }
}

export { createMuteQuackBehavior };
