import { ReplaceTextMenuCommand } from '../ReplaceTextMenuCommand';
import { createFakeController, asController } from './helpers/fakeController';

describe('ReplaceTextMenuCommand', () => {
    describe('metadata', () => {
        it('has name "ReplaceText"', () => {
            const cmd = new ReplaceTextMenuCommand(asController(createFakeController()));
            expect(cmd.getName()).toBe('ReplaceText');
        });

        it('has usage mentioning position and text', () => {
            const cmd = new ReplaceTextMenuCommand(asController(createFakeController()));
            expect(cmd.getUsage()).toMatch(/ReplaceText/);
        });

        it('has non-empty description', () => {
            const cmd = new ReplaceTextMenuCommand(asController(createFakeController()));
            expect(cmd.getDescription().length).toBeGreaterThan(0);
        });
    });

    describe('parsing', () => {
        it('parses position and text', () => {
            const ctrl = createFakeController(5);
            new ReplaceTextMenuCommand(asController(ctrl)).execute('2 hello');
            expect(ctrl.replaceText).toHaveBeenCalledWith({ position: 1, text: 'hello' });
        });

        it('joins the rest of the line as text', () => {
            const ctrl = createFakeController(5);
            new ReplaceTextMenuCommand(asController(ctrl)).execute('1 new text goes here');
            expect(ctrl.replaceText).toHaveBeenCalledWith({
                position: 0,
                text: 'new text goes here',
            });
        });

        it('accepts position 1 on 1-item document', () => {
            const ctrl = createFakeController(1);
            new ReplaceTextMenuCommand(asController(ctrl)).execute('1 first');
            expect(ctrl.replaceText).toHaveBeenCalledWith({ position: 0, text: 'first' });
        });

        it('accepts the last position', () => {
            const ctrl = createFakeController(5);
            new ReplaceTextMenuCommand(asController(ctrl)).execute('5 last');
            expect(ctrl.replaceText).toHaveBeenCalledWith({ position: 4, text: 'last' });
        });

        it('preserves special characters in text', () => {
            const ctrl = createFakeController(3);
            new ReplaceTextMenuCommand(asController(ctrl)).execute('1 <b>&"x"</b>');
            expect(ctrl.replaceText).toHaveBeenCalledWith({
                position: 0,
                text: '<b>&"x"</b>',
            });
        });
    });

    describe('error cases (controller must not be called)', () => {
        it('throws on missing text', () => {
            const ctrl = createFakeController(5);
            expect(() => new ReplaceTextMenuCommand(asController(ctrl)).execute('1')).toThrow();
            expect(ctrl.replaceText).not.toHaveBeenCalled();
        });

        it('throws on empty args', () => {
            const ctrl = createFakeController(5);
            expect(() => new ReplaceTextMenuCommand(asController(ctrl)).execute('')).toThrow();
            expect(ctrl.replaceText).not.toHaveBeenCalled();
        });

        it('throws on position 0', () => {
            const ctrl = createFakeController(5);
            expect(() => new ReplaceTextMenuCommand(asController(ctrl)).execute('0 hello')).toThrow();
            expect(ctrl.replaceText).not.toHaveBeenCalled();
        });

        it('throws on out-of-range position', () => {
            const ctrl = createFakeController(5);
            expect(() => new ReplaceTextMenuCommand(asController(ctrl)).execute('6 hello')).toThrow();
            expect(ctrl.replaceText).not.toHaveBeenCalled();
        });

        it('throws on non-numeric position', () => {
            const ctrl = createFakeController(5);
            expect(() => new ReplaceTextMenuCommand(asController(ctrl)).execute('abc hello')).toThrow();
            expect(ctrl.replaceText).not.toHaveBeenCalled();
        });
    });
});