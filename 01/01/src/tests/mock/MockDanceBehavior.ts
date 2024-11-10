import { IDanceBehavior } from "../../behavor/IDanceBehavor";

export class MockDanceBehavior implements IDanceBehavior {
    public dance = jest.fn();
}

