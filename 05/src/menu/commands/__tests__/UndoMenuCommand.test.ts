import { UndoMenuCommand } from '../UndoMenuCommand';
import { createFakeController, asController } from './helpers/fakeController';

describe('UndoMenuCommand', () => {
    it('delegates to controller.undo', () => {
        const ctrl = createFakeController();
        new UndoMenuCommand(asController(ctrl)).execute();
        expect(ctrl.undo).toHaveBeenCalledTimes(1);
    });

    it('ignores args', () => {
        const ctrl = createFakeController();
        new UndoMenuCommand(asController(ctrl)).execute('some garbage');
        expect(ctrl.undo).toHaveBeenCalledTimes(1);
    });

    it('propagates controller errors', () => {
        const ctrl = createFakeController();
        ctrl.undo.mockImplementation(() => { throw new Error('Nothing to undo!'); });
        expect(() => new UndoMenuCommand(asController(ctrl)).execute()).toThrow(/Nothing to undo/);
    });

    it('exposes metadata', () => {
        const ctrl = createFakeController();
        const cmd = new UndoMenuCommand(asController(ctrl));
        expect(cmd.getName()).toBe('Undo');
        expect(cmd.getUsage()).toBe('Undo');
        expect(cmd.getDescription().length).toBeGreaterThan(0);
    });
});