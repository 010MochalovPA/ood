import { IQuackBehavior } from "../../behavior/quack/IQuackBehavior";

class MockQuackBehavior implements IQuackBehavior {
    public quack = jest.fn();
}

export { MockQuackBehavior };