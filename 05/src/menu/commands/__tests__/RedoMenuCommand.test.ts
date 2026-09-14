import { RedoMenuCommand } from '../RedoMenuCommand';
import { createFakeController, asController } from './helpers/fakeController';

describe('RedoMenuCommand', () => {
    it('delegates to controller.redo', () => {
        const ctrl = createFakeController();
        new RedoMenuCommand(asController(ctrl)).execute();
        expect(ctrl.redo).toHaveBeenCalledTimes(1);
    });

    it('ignores args', () => {
        const ctrl = createFakeController();
        new RedoMenuCommand(asController(ctrl)).execute('garbage');
        expect(ctrl.redo).toHaveBeenCalledTimes(1);
    });

    it('propagates controller errors', () => {
        const ctrl = createFakeController();
        ctrl.redo.mockImplementation(() => { throw new Error('Nothing to redo!'); });
        expect(() => new RedoMenuCommand(asController(ctrl)).execute()).toThrow(/Nothing to redo/);
    });

    it('exposes metadata', () => {
        const ctrl = createFakeController();
        const cmd = new RedoMenuCommand(asController(ctrl));
        expect(cmd.getName()).toBe('Redo');
        expect(cmd.getUsage()).toBe('Redo');
    });
});