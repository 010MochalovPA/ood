import { Duck } from "../duck/Duck";
import { MockDanceBehavior } from "./mock/MockDanceBehavior";
import { MockDuck } from "./mock/MockDuck";

describe("Duck", () => {
    let duck: Duck;
    
    beforeEach(() => {
        duck = new MockDuck();
    });

    test("should call dance method of DanceBehavior when duck dances", () => {
        duck.dance();
        const mockDanceBehavior = duck.danceBehavior;
        expect(mockDanceBehavior.dance).toHaveBeenCalled();
    });

    test("should allow changing dance behavior", () => {
        const newMockDanceBehavior = new MockDanceBehavior();
        duck.danceBehavior = newMockDanceBehavior;
        duck.dance();
        expect(newMockDanceBehavior.dance).toHaveBeenCalled();
    });
});