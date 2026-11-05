import { SoldState } from '../states/SoldState';
import { IGumballMachine } from '../types';

describe('SoldState', () => {
    let mockMachine: jest.Mocked<IGumballMachine>;
    let state: SoldState;

    beforeEach(() => {
        mockMachine = {
            releaseBall: jest.fn(),
            getBallCount: jest.fn(),
            setSoldOutState: jest.fn(),
            setNoQuarterState: jest.fn(),
            setSoldState: jest.fn(),
            setHasQuarterState: jest.fn(),
        } as unknown as jest.Mocked<IGumballMachine>;

        state = new SoldState(mockMachine);
    });

    test('выдача должна вызывать уменьшение счетчика жвачек', () => {
        state.dispense();
        expect(mockMachine.releaseBall).toHaveBeenCalled();
    });

    test('если жвачки закончились, машина должна переходить в состояние SoldOut', () => {
        (mockMachine.getBallCount as jest.Mock).mockReturnValue(0);
        state.dispense();
        expect(mockMachine.setSoldOutState).toHaveBeenCalled();
    });

    test('если жвачки остались, машина должна переходить в состояние NoQuarter', () => {
        (mockMachine.getBallCount as jest.Mock).mockReturnValue(1);
        state.dispense();
        expect(mockMachine.setNoQuarterState).toHaveBeenCalled();
    });

    test('повторный поворот ручки во время выдачи должен блокироваться', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        state.turnCrank();
        expect(consoleSpy).toHaveBeenCalledWith("Turning twice doesn't get you another gumball");
        consoleSpy.mockRestore();
    });

    test('вставка монеты во время выдачи должна быть заблокирована', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        state.insertQuarter();
        expect(consoleSpy).toHaveBeenCalledWith("Please wait, we're already giving you a gumball");
        consoleSpy.mockRestore();
    });

    test('возврат монеты во время выдачи должен быть заблокирован', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        state.ejectQuarter();
        expect(consoleSpy).toHaveBeenCalledWith("Sorry you already turned the crank");
        consoleSpy.mockRestore();
    });

    test('должен возвращать корректное строковое описание состояния', () => {
        expect(state.toString()).toBe("delivering a gumball");
    });
});