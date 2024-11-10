import { IQuackBehavior } from "./IQuackBehavior";

function createQuackBehavior(): IQuackBehavior {
    return () => {
        console.log('Кря Кря!');
    }
}

export { createQuackBehavior };
