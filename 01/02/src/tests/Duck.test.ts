import { MockDuck } from "./mock/MockDuck";
import { MockNoFlyBehavior } from "./mock/MockNoFlyBehavior";

describe('MockDuck behavior tests', () => {
    let mockDuck: MockDuck;

    beforeEach(() => {
        mockDuck = new MockDuck();
    });

    it('should not quack when using MockNoFlyBehavior', () => {
        mockDuck.flyBehavior = new MockNoFlyBehavior();

        mockDuck.performFly();
        mockDuck.performFly();
        mockDuck.performFly();
        mockDuck.performFly();

        expect(mockDuck.quackBehavior.quack).not.toHaveBeenCalled();
    });

    it('should not quack after the first flight', () => {
        mockDuck.performFly();

        expect(mockDuck.quackBehavior.quack).not.toHaveBeenCalled();
    });

    it('should quack after the second flight', () => {
        mockDuck.performFly();
        mockDuck.performFly();

        expect(mockDuck.quackBehavior.quack).toHaveBeenCalledTimes(1);
    });

    it('should quack after every second flight', () => {
        mockDuck.performFly();
        mockDuck.performFly();
        mockDuck.performFly();
        mockDuck.performFly();

        expect(mockDuck.quackBehavior.quack).toHaveBeenCalledTimes(2);
    });
});