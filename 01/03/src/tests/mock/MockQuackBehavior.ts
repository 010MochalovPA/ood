import { IQuackBehavior } from "../../behavior/quack/IQuackBehavior";

function createMockQuackBehavior(): IQuackBehavior {
    return jest.fn()
}

export { createMockQuackBehavior };