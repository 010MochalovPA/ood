import { NoQuarterState } from '../states/NoQuarterState';
import { IGumballMachine } from '../types';

describe('NoQuarterState', () => {
    let mockMachine: jest.Mocked<IGumballMachine>;
    let state: NoQuarterState;

    beforeEach(() => {
        mockMachine = {
            releaseBall: jest.fn(),
            getBallCount: jest.fn(),
            setSoldOutState: jest.fn(),
            setNoQuarterState: jest.fn(),
            setSoldState: jest.fn(),
            setHasQuarterState: jest.fn(),
        } as unknown as jest.Mocked<IGumballMachine>;

        state = new NoQuarterState(mockMachine);
    });

    test('вставка монеты должна переводить машину в состояние HasQuarter', () => {
        state.insertQuarter();
        expect(mockMachine.setHasQuarterState).toHaveBeenCalled();
    });

    test('попытка вернуть монету должна выводить сообщение об ошибке', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        state.ejectQuarter();
        expect(consoleSpy).toHaveBeenCalledWith("You haven't inserted a quarter");
        consoleSpy.mockRestore();
    });

    test('поворот ручки без монеты должен выводить сообщение об ошибке', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        state.turnCrank();
        expect(consoleSpy).toHaveBeenCalledWith("You turned but there's no quarter");
        consoleSpy.mockRestore();
    });

    test('попытка выдачи без оплаты должна выводить сообщение об ошибке', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        state.dispense();
        expect(consoleSpy).toHaveBeenCalledWith("You need to pay first");
        consoleSpy.mockRestore();
    });
});