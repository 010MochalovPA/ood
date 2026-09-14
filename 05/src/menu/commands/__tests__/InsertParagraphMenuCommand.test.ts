import { InsertParagraphMenuCommand } from '../InsertParagraphMenuCommand';
import { createFakeController, asController } from './helpers/fakeController';

describe('InsertParagraphMenuCommand', () => {
    describe('metadata', () => {
        it('has name "InsertParagraph"', () => {
            const cmd = new InsertParagraphMenuCommand(asController(createFakeController()));
            expect(cmd.getName()).toBe('InsertParagraph');
        });

        it('has usage mentioning position or end', () => {
            const cmd = new InsertParagraphMenuCommand(asController(createFakeController()));
            expect(cmd.getUsage()).toMatch(/InsertParagraph/);
            expect(cmd.getUsage()).toMatch(/end/);
        });

        it('has non-empty description', () => {
            const cmd = new InsertParagraphMenuCommand(asController(createFakeController()));
            expect(cmd.getDescription().length).toBeGreaterThan(0);
        });
    });

    describe('parsing', () => {
        it('parses numeric position (1-based → 0-based)', () => {
            const ctrl = createFakeController(5);
            new InsertParagraphMenuCommand(asController(ctrl)).execute('1 hello');
            expect(ctrl.insertParagraph).toHaveBeenCalledWith({ position: 0, text: 'hello' });
        });

        it('parses a middle position', () => {
            const ctrl = createFakeController(5);
            new InsertParagraphMenuCommand(asController(ctrl)).execute('3 text');
            expect(ctrl.insertParagraph).toHaveBeenCalledWith({ position: 2, text: 'text' });
        });

        it('parses "end" as the current item count', () => {
            const ctrl = createFakeController(4);
            new InsertParagraphMenuCommand(asController(ctrl)).execute('end tail');
            expect(ctrl.insertParagraph).toHaveBeenCalledWith({ position: 4, text: 'tail' });
        });

        it('accepts "END" case-insensitively', () => {
            const ctrl = createFakeController(2);
            new InsertParagraphMenuCommand(asController(ctrl)).execute('END text');
            expect(ctrl.insertParagraph).toHaveBeenCalledWith({ position: 2, text: 'text' });
        });

        it('joins the rest of the line as text', () => {
            const ctrl = createFakeController(3);
            new InsertParagraphMenuCommand(asController(ctrl)).execute('1 hello world from tests');
            expect(ctrl.insertParagraph).toHaveBeenCalledWith({
                position: 0,
                text: 'hello world from tests',
            });
        });

        it('preserves punctuation and special characters in text', () => {
            const ctrl = createFakeController(1);
            new InsertParagraphMenuCommand(asController(ctrl)).execute('1 <b>&"x"</b>');
            expect(ctrl.insertParagraph).toHaveBeenCalledWith({
                position: 0,
                text: '<b>&"x"</b>',
            });
        });
    });

    describe('error cases (controller must not be called)', () => {
        it('throws on missing text', () => {
            const ctrl = createFakeController(3);
            expect(() => new InsertParagraphMenuCommand(asController(ctrl)).execute('1')).toThrow();
            expect(ctrl.insertParagraph).not.toHaveBeenCalled();
        });

        it('throws on missing position', () => {
            const ctrl = createFakeController(3);
            expect(() => new InsertParagraphMenuCommand(asController(ctrl)).execute('')).toThrow();
            expect(ctrl.insertParagraph).not.toHaveBeenCalled();
        });

        it('throws on position 0', () => {
            const ctrl = createFakeController(3);
            expect(() => new InsertParagraphMenuCommand(asController(ctrl)).execute('0 text')).toThrow();
            expect(ctrl.insertParagraph).not.toHaveBeenCalled();
        });

        it('throws on out-of-range position', () => {
            const ctrl = createFakeController(3);
            expect(() => new InsertParagraphMenuCommand(asController(ctrl)).execute('4 text')).toThrow();
            expect(ctrl.insertParagraph).not.toHaveBeenCalled();
        });

        it('throws on whitespace-only text', () => {
            const ctrl = createFakeController(3);
            expect(() => new InsertParagraphMenuCommand(asController(ctrl)).execute('1   ')).toThrow();
            expect(ctrl.insertParagraph).not.toHaveBeenCalled();
        });
    });
});