import { SetTitleMenuCommand } from '../SetTitleMenuCommand';
import { createFakeController, asController } from './helpers/fakeController';

describe('SetTitleMenuCommand', () => {
    describe('metadata', () => {
        it('has name "SetTitle"', () => {
            const cmd = new SetTitleMenuCommand(asController(createFakeController()));
            expect(cmd.getName()).toBe('SetTitle');
        });

        it('has usage mentioning SetTitle', () => {
            const cmd = new SetTitleMenuCommand(asController(createFakeController()));
            expect(cmd.getUsage()).toMatch(/SetTitle/);
        });

        it('has non-empty description', () => {
            const cmd = new SetTitleMenuCommand(asController(createFakeController()));
            expect(cmd.getDescription().length).toBeGreaterThan(0);
        });
    });

    describe('parsing', () => {
        it('passes a single-word title', () => {
            const ctrl = createFakeController();
            new SetTitleMenuCommand(asController(ctrl)).execute('Hello');
            expect(ctrl.setTitle).toHaveBeenCalledWith({ title: 'Hello' });
        });

        it('joins the entire line into a title', () => {
            const ctrl = createFakeController();
            new SetTitleMenuCommand(asController(ctrl)).execute('My great document');
            expect(ctrl.setTitle).toHaveBeenCalledWith({ title: 'My great document' });
        });

        it('preserves punctuation', () => {
            const ctrl = createFakeController();
            new SetTitleMenuCommand(asController(ctrl)).execute('Title: with, punctuation!');
            expect(ctrl.setTitle).toHaveBeenCalledWith({ title: 'Title: with, punctuation!' });
        });

        it('preserves non-ASCII text', () => {
            const ctrl = createFakeController();
            new SetTitleMenuCommand(asController(ctrl)).execute('Заголовок документа');
            expect(ctrl.setTitle).toHaveBeenCalledWith({ title: 'Заголовок документа' });
        });

        it('preserves HTML special characters', () => {
            const ctrl = createFakeController();
            new SetTitleMenuCommand(asController(ctrl)).execute('<b>Title</b> & "quoted"');
            expect(ctrl.setTitle).toHaveBeenCalledWith({ title: '<b>Title</b> & "quoted"' });
        });
    });

    describe('error cases (controller must not be called)', () => {
        it('throws on empty args', () => {
            const ctrl = createFakeController();
            expect(() => new SetTitleMenuCommand(asController(ctrl)).execute('')).toThrow();
            expect(ctrl.setTitle).not.toHaveBeenCalled();
        });

        it('throws on whitespace-only args', () => {
            const ctrl = createFakeController();
            expect(() => new SetTitleMenuCommand(asController(ctrl)).execute('    ')).toThrow();
            expect(ctrl.setTitle).not.toHaveBeenCalled();
        });
    });
});