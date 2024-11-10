import { IDanceBehavior } from "../../behavior/dance/IDanceBehavior";

function createMockDanceBehavior(): IDanceBehavior {
    return jest.fn()
}

export { createMockDanceBehavior };