import { SaveMenuCommand } from '../SaveMenuCommand';
import { createFakeController, asController } from './helpers/fakeController';

describe('SaveMenuCommand', () => {
    it('passes the path to controller.save', () => {
        const ctrl = createFakeController();
        new SaveMenuCommand(asController(ctrl)).execute('out.html');
        expect(ctrl.save).toHaveBeenCalledWith('out.html');
    });

    it('accepts paths with spaces', () => {
        const ctrl = createFakeController();
        new SaveMenuCommand(asController(ctrl)).execute('my docs/out file.html');
        expect(ctrl.save).toHaveBeenCalledWith('my docs/out file.html');
    });

    it('throws when path is empty', () => {
        const ctrl = createFakeController();
        expect(() => new SaveMenuCommand(asController(ctrl)).execute('')).toThrow(/empty/);
    });

    it('throws on whitespace-only path', () => {
        const ctrl = createFakeController();
        expect(() => new SaveMenuCommand(asController(ctrl)).execute('   ')).toThrow(/empty/);
    });

    it('does not call controller when path parsing fails', () => {
        const ctrl = createFakeController();
        try { new SaveMenuCommand(asController(ctrl)).execute(''); } catch { /* ignore */ }
        expect(ctrl.save).not.toHaveBeenCalled();
    });

    it('exposes metadata', () => {
        const ctrl = createFakeController();
        const cmd = new SaveMenuCommand(asController(ctrl));
        expect(cmd.getName()).toBe('Save');
        expect(cmd.getUsage()).toContain('Save');
    });
});