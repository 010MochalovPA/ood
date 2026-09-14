import { InsertImageMenuCommand } from '../InsertImageMenuCommand';
import { createFakeController, asController } from './helpers/fakeController';

describe('InsertImageMenuCommand', () => {
    describe('metadata', () => {
        it('has name "InsertImage"', () => {
            const cmd = new InsertImageMenuCommand(asController(createFakeController()));
            expect(cmd.getName()).toBe('InsertImage');
        });

        it('has usage mentioning position, width, height, path', () => {
            const cmd = new InsertImageMenuCommand(asController(createFakeController()));
            const usage = cmd.getUsage();
            expect(usage).toMatch(/InsertImage/);
            expect(usage).toMatch(/width/);
            expect(usage).toMatch(/height/);
            expect(usage).toMatch(/path/);
        });

        it('has non-empty description', () => {
            const cmd = new InsertImageMenuCommand(asController(createFakeController()));
            expect(cmd.getDescription().length).toBeGreaterThan(0);
        });
    });

    describe('parsing', () => {
        it('parses numeric position and all arguments', () => {
            const ctrl = createFakeController(5);
            new InsertImageMenuCommand(asController(ctrl)).execute('2 100 200 cat.png');
            expect(ctrl.insertImage).toHaveBeenCalledWith({
                position: 1,
                width: 100,
                height: 200,
                path: 'cat.png',
            });
        });

        it('parses "end" as the current item count', () => {
            const ctrl = createFakeController(3);
            new InsertImageMenuCommand(asController(ctrl)).execute('end 50 75 img.png');
            expect(ctrl.insertImage).toHaveBeenCalledWith({
                position: 3,
                width: 50,
                height: 75,
                path: 'img.png',
            });
        });

        it('accepts "END" case-insensitively', () => {
            const ctrl = createFakeController(3);
            new InsertImageMenuCommand(asController(ctrl)).execute('END 10 10 x.png');
            expect(ctrl.insertImage).toHaveBeenCalledWith({
                position: 3,
                width: 10,
                height: 10,
                path: 'x.png',
            });
        });

        it('preserves a nested path', () => {
            const ctrl = createFakeController(1);
            new InsertImageMenuCommand(asController(ctrl)).execute('1 10 20 assets/img/cat.png');
            expect(ctrl.insertImage).toHaveBeenCalledWith({
                position: 0,
                width: 10,
                height: 20,
                path: 'assets/img/cat.png',
            });
        });

        it('preserves an absolute path', () => {
            const ctrl = createFakeController(1);
            new InsertImageMenuCommand(asController(ctrl)).execute('1 10 20 /tmp/cat.png');
            expect(ctrl.insertImage).toHaveBeenCalledWith({
                position: 0,
                width: 10,
                height: 20,
                path: '/tmp/cat.png',
            });
        });

        it('handles paths with spaces by joining them back', () => {
            const ctrl = createFakeController(1);
            new InsertImageMenuCommand(asController(ctrl)).execute('1 10 20 my cat.png');
            expect(ctrl.insertImage).toHaveBeenCalledWith({
                position: 0,
                width: 10,
                height: 20,
                path: 'my cat.png',
            });
        });

        it('accepts boundary widths (1 and 10000)', () => {
            const ctrl = createFakeController(1);
            new InsertImageMenuCommand(asController(ctrl)).execute('1 1 10000 img.png');
            expect(ctrl.insertImage).toHaveBeenCalledWith({
                position: 0,
                width: 1,
                height: 10000,
                path: 'img.png',
            });
        });
    });

    describe('error cases (controller must not be called)', () => {
        it('throws on missing path', () => {
            const ctrl = createFakeController(5);
            expect(() => new InsertImageMenuCommand(asController(ctrl)).execute('1 100 200')).toThrow();
            expect(ctrl.insertImage).not.toHaveBeenCalled();
        });

        it('throws on empty args', () => {
            const ctrl = createFakeController(5);
            expect(() => new InsertImageMenuCommand(asController(ctrl)).execute('')).toThrow();
            expect(ctrl.insertImage).not.toHaveBeenCalled();
        });

        it('throws on position 0', () => {
            const ctrl = createFakeController(5);
            expect(() => new InsertImageMenuCommand(asController(ctrl)).execute('0 100 200 a.png')).toThrow();
            expect(ctrl.insertImage).not.toHaveBeenCalled();
        });

        it('throws on out-of-range position', () => {
            const ctrl = createFakeController(5);
            expect(() => new InsertImageMenuCommand(asController(ctrl)).execute('6 100 200 a.png')).toThrow();
            expect(ctrl.insertImage).not.toHaveBeenCalled();
        });

        it('throws on width 0', () => {
            const ctrl = createFakeController(5);
            expect(() => new InsertImageMenuCommand(asController(ctrl)).execute('1 0 200 a.png')).toThrow();
            expect(ctrl.insertImage).not.toHaveBeenCalled();
        });

        it('throws on width 10001', () => {
            const ctrl = createFakeController(5);
            expect(() => new InsertImageMenuCommand(asController(ctrl)).execute('1 10001 200 a.png')).toThrow();
            expect(ctrl.insertImage).not.toHaveBeenCalled();
        });

        it('throws on non-integer width', () => {
            const ctrl = createFakeController(5);
            expect(() => new InsertImageMenuCommand(asController(ctrl)).execute('1 1.5 200 a.png')).toThrow();
            expect(ctrl.insertImage).not.toHaveBeenCalled();
        });

        it('throws on non-numeric height', () => {
            const ctrl = createFakeController(5);
            expect(() => new InsertImageMenuCommand(asController(ctrl)).execute('1 100 abc a.png')).toThrow();
            expect(ctrl.insertImage).not.toHaveBeenCalled();
        });
    });
});