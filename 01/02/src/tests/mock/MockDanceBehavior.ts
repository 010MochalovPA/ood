import { IDanceBehavior } from "../../behavior/dance/IDanceBehavior";

class MockDanceBehavior implements IDanceBehavior {
    public dance = jest.fn();
}

export { MockDanceBehavior };