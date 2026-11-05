import { GumballMachine } from '../GumballMachine';

describe('GumballMachine', () => {
    let machine: GumballMachine;

    beforeEach(() => {
        machine = new GumballMachine(5);
    });

    test('должна инициализироваться в состоянии ожидания монеты, если есть жвачки', () => {
        expect(machine.toString()).toContain('waiting for quarter');
    });

    test('должна инициализироваться в состоянии распродано, если жвачек нет', () => {
        const emptyMachine = new GumballMachine(0);
        expect(emptyMachine.toString()).toContain('sold out');
    });

    test('должна переходить в состояние ожидания ручки после вставки монеты', () => {
        machine.insertQuarter();
        expect(machine.toString()).toContain('waiting for turn of crank');
    });

    test('должна выдавать жвачку и возвращаться в ожидание монеты после поворота ручки', () => {
        machine.insertQuarter();
        machine.turnCrank();
        expect(machine.toString()).toContain('waiting for quarter');
        expect(machine.getBallCount()).toBe(4);
    });

    test('не должна принимать вторую монету, если одна уже вставлена', () => {
        machine.insertQuarter();
        const consoleSpy = jest.spyOn(console, 'log');
        machine.insertQuarter();
        expect(consoleSpy).toHaveBeenCalledWith("You can't insert another quarter");
        consoleSpy.mockRestore();
    });

    test('не должна выдавать жвачку при повороте ручки без монеты', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        machine.turnCrank();
        expect(consoleSpy).toHaveBeenCalledWith("You turned but there's no quarter");
        expect(machine.getBallCount()).toBe(5);
        consoleSpy.mockRestore();
    });

    test('должна корректно обрабатывать возврат монеты через делегирование', () => {
        machine.insertQuarter();
        const consoleSpy = jest.spyOn(console, 'log');
        machine.ejectQuarter();
        expect(consoleSpy).toHaveBeenCalledWith("Quarter returned");
        expect(machine.toString()).toContain('waiting for quarter');
        consoleSpy.mockRestore();
    });

    test('должна возвращать корректную строку состояния через toString', () => {
        const result = machine.toString();
        expect(result).toContain('Count: 5');
        expect(result).toContain('State: waiting for quarter');
    });

    test('полная проверка формата вывода toString', () => {
        expect(machine.toString()).toBe('Count: 5, State: waiting for quarter');
    });

    test('должна переходить из состояния SoldOut в NoQuarter при пополнении запаса', () => {
        const emptyMachine = new GumballMachine(0);
        expect(emptyMachine.toString()).toContain('sold out');

        emptyMachine.refill(5);

        expect(emptyMachine.getBallCount()).toBe(5);
        expect(emptyMachine.toString()).toContain('waiting for quarter');
    });

    test('должна увеличивать количество жвачек, если автомат уже не пуст', () => {
        machine.refill(10);
        expect(machine.getBallCount()).toBe(15);
        expect(machine.toString()).toContain('waiting for quarter');
    });

    test('должна сохранять монету внутри при пополнении в состоянии HasQuarter', () => {
        machine.insertQuarter();
        expect(machine.toString()).toContain('waiting for turn of crank');

        machine.refill(5);

        expect(machine.getBallCount()).toBe(10);
        expect(machine.toString()).toContain('waiting for turn of crank');
    });

    test('должна корректно восстанавливать работу автомата после полной продажи и последующего пополнения', () => {
        const singleMachine = new GumballMachine(1);
        singleMachine.insertQuarter();
        singleMachine.turnCrank();

        expect(singleMachine.toString()).toContain('sold out');

        singleMachine.refill(3);

        expect(singleMachine.getBallCount()).toBe(3);
        expect(singleMachine.toString()).toContain('waiting for quarter');
    });
});