import { DeleteItemMenuCommand } from '../DeleteItemMenuCommand';
import { createFakeController, asController } from './helpers/fakeController';

describe('DeleteItemMenuCommand', () => {
    describe('metadata', () => {
        it('has name "DeleteItem"', () => {
            const cmd = new DeleteItemMenuCommand(asController(createFakeController()));
            expect(cmd.getName()).toBe('DeleteItem');
        });

        it('has usage mentioning position', () => {
            const cmd = new DeleteItemMenuCommand(asController(createFakeController()));
            expect(cmd.getUsage()).toMatch(/DeleteItem/);
        });

        it('has non-empty description', () => {
            const cmd = new DeleteItemMenuCommand(asController(createFakeController()));
            expect(cmd.getDescription().length).toBeGreaterThan(0);
        });
    });

    describe('parsing', () => {
        it('parses position 1 → index 0', () => {
            const ctrl = createFakeController(5);
            new DeleteItemMenuCommand(asController(ctrl)).execute('1');
            expect(ctrl.deleteItem).toHaveBeenCalledWith({ position: 0 });
        });

        it('parses a middle position', () => {
            const ctrl = createFakeController(5);
            new DeleteItemMenuCommand(asController(ctrl)).execute('3');
            expect(ctrl.deleteItem).toHaveBeenCalledWith({ position: 2 });
        });

        it('parses the last position', () => {
            const ctrl = createFakeController(5);
            new DeleteItemMenuCommand(asController(ctrl)).execute('5');
            expect(ctrl.deleteItem).toHaveBeenCalledWith({ position: 4 });
        });

        it('parses position 1 in a 1-item document', () => {
            const ctrl = createFakeController(1);
            new DeleteItemMenuCommand(asController(ctrl)).execute('1');
            expect(ctrl.deleteItem).toHaveBeenCalledWith({ position: 0 });
        });
    });

    describe('error cases (controller must not be called)', () => {
        it('throws on missing position', () => {
            const ctrl = createFakeController(3);
            expect(() => new DeleteItemMenuCommand(asController(ctrl)).execute('')).toThrow();
            expect(ctrl.deleteItem).not.toHaveBeenCalled();
        });

        it('throws on position 0', () => {
            const ctrl = createFakeController(3);
            expect(() => new DeleteItemMenuCommand(asController(ctrl)).execute('0')).toThrow();
            expect(ctrl.deleteItem).not.toHaveBeenCalled();
        });

        it('throws on out-of-range position', () => {
            const ctrl = createFakeController(3);
            expect(() => new DeleteItemMenuCommand(asController(ctrl)).execute('4')).toThrow();
            expect(ctrl.deleteItem).not.toHaveBeenCalled();
        });

        it('throws on non-numeric position', () => {
            const ctrl = createFakeController(3);
            expect(() => new DeleteItemMenuCommand(asController(ctrl)).execute('abc')).toThrow();
            expect(ctrl.deleteItem).not.toHaveBeenCalled();
        });

        it('throws on any position for empty document', () => {
            const ctrl = createFakeController(0);
            expect(() => new DeleteItemMenuCommand(asController(ctrl)).execute('1')).toThrow();
            expect(ctrl.deleteItem).not.toHaveBeenCalled();
        });
    });
});