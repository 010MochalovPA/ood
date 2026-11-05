import { HasQuarterState } from '../states/HasQuarterState';
import { IGumballMachine } from '../types';

describe('HasQuarterState', () => {
    let mockMachine: jest.Mocked<IGumballMachine>;
    let state: HasQuarterState;

    beforeEach(() => {
        mockMachine = {
            releaseBall: jest.fn(),
            getBallCount: jest.fn(),
            setSoldOutState: jest.fn(),
            setNoQuarterState: jest.fn(),
            setSoldState: jest.fn(),
            setHasQuarterState: jest.fn(),
        } as unknown as jest.Mocked<IGumballMachine>;

        state = new HasQuarterState(mockMachine);
    });

    test('возврат монеты должен переводить машину в состояние NoQuarter', () => {
        state.ejectQuarter();
        expect(mockMachine.setNoQuarterState).toHaveBeenCalled();
    });

    test('поворот ручки должен переводить машину в состояние Sold', () => {
        state.turnCrank();
        expect(mockMachine.setSoldState).toHaveBeenCalled();
    });

    test('вставка второй монеты должна быть заблокирована', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        state.insertQuarter();
        expect(consoleSpy).toHaveBeenCalledWith("You can't insert another quarter");
        consoleSpy.mockRestore();
    });

    test('попытка выдачи жвачки без поворота ручки должна быть заблокирована', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        state.dispense();
        expect(consoleSpy).toHaveBeenCalledWith("No gumball dispensed");
        consoleSpy.mockRestore();
    });
});