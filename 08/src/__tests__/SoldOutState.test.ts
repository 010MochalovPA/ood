import { SoldOutState } from '../states/SoldOutState';
import { IGumballMachine } from '../types';

describe('SoldOutState', () => {
    let mockMachine: jest.Mocked<IGumballMachine>;
    let state: SoldOutState;

    beforeEach(() => {
        mockMachine = {
            releaseBall: jest.fn(),
            getBallCount: jest.fn(),
            setSoldOutState: jest.fn(),
            setNoQuarterState: jest.fn(),
            setSoldState: jest.fn(),
            setHasQuarterState: jest.fn(),
        } as unknown as jest.Mocked<IGumballMachine>;

        state = new SoldOutState(mockMachine);
    });

    test('вставка монеты в пустой автомат должна быть заблокирована', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        state.insertQuarter();
        expect(consoleSpy).toHaveBeenCalledWith("You can't insert a quarter, the machine is sold out");
        consoleSpy.mockRestore();
    });

    test('поворот ручки в пустом автомате должен выводить сообщение об отсутствии жвачек', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        state.turnCrank();
        expect(consoleSpy).toHaveBeenCalledWith("You turned but there's no gumballs");
        consoleSpy.mockRestore();
    });

    test('попытка вернуть монету из пустого автомата должна быть заблокирована', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        state.ejectQuarter();
        expect(consoleSpy).toHaveBeenCalledWith("You can't eject, you haven't inserted a quarter yet");
        consoleSpy.mockRestore();
    });

    test('попытка выдачи из пустого автомата должна быть заблокирована', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        state.dispense();
        expect(consoleSpy).toHaveBeenCalledWith("No gumball dispensed");
        consoleSpy.mockRestore();
    });
});