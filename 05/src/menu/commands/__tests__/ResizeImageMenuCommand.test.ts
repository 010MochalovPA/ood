import { ResizeImageMenuCommand } from '../ResizeImageMenuCommand';
import { createFakeController, asController } from './helpers/fakeController';

describe('ResizeImageMenuCommand', () => {
    describe('metadata', () => {
        it('has name "ResizeImage"', () => {
            const cmd = new ResizeImageMenuCommand(asController(createFakeController()));
            expect(cmd.getName()).toBe('ResizeImage');
        });

        it('has usage mentioning position, width, height', () => {
            const cmd = new ResizeImageMenuCommand(asController(createFakeController()));
            const usage = cmd.getUsage();
            expect(usage).toMatch(/ResizeImage/);
            expect(usage).toMatch(/width/);
            expect(usage).toMatch(/height/);
        });

        it('has non-empty description', () => {
            const cmd = new ResizeImageMenuCommand(asController(createFakeController()));
            expect(cmd.getDescription().length).toBeGreaterThan(0);
        });
    });

    describe('parsing', () => {
        it('parses position, width, height', () => {
            const ctrl = createFakeController(5);
            new ResizeImageMenuCommand(asController(ctrl)).execute('2 100 200');
            expect(ctrl.resizeImage).toHaveBeenCalledWith({
                position: 1,
                width: 100,
                height: 200,
            });
        });

        it('parses position 1 as index 0', () => {
            const ctrl = createFakeController(3);
            new ResizeImageMenuCommand(asController(ctrl)).execute('1 50 50');
            expect(ctrl.resizeImage).toHaveBeenCalledWith({
                position: 0,
                width: 50,
                height: 50,
            });
        });

        it('parses the last position', () => {
            const ctrl = createFakeController(5);
            new ResizeImageMenuCommand(asController(ctrl)).execute('5 10 10');
            expect(ctrl.resizeImage).toHaveBeenCalledWith({
                position: 4,
                width: 10,
                height: 10,
            });
        });

        it('accepts boundary sizes (1 and 10000)', () => {
            const ctrl = createFakeController(1);
            new ResizeImageMenuCommand(asController(ctrl)).execute('1 1 10000');
            expect(ctrl.resizeImage).toHaveBeenCalledWith({
                position: 0,
                width: 1,
                height: 10000,
            });
        });
    });

    describe('error cases (controller must not be called)', () => {
        it('throws on missing height', () => {
            const ctrl = createFakeController(5);
            expect(() => new ResizeImageMenuCommand(asController(ctrl)).execute('1 100')).toThrow();
            expect(ctrl.resizeImage).not.toHaveBeenCalled();
        });

        it('throws on empty args', () => {
            const ctrl = createFakeController(5);
            expect(() => new ResizeImageMenuCommand(asController(ctrl)).execute('')).toThrow();
            expect(ctrl.resizeImage).not.toHaveBeenCalled();
        });

        it('throws on position 0', () => {
            const ctrl = createFakeController(5);
            expect(() => new ResizeImageMenuCommand(asController(ctrl)).execute('0 100 200')).toThrow();
            expect(ctrl.resizeImage).not.toHaveBeenCalled();
        });

        it('throws on out-of-range position', () => {
            const ctrl = createFakeController(5);
            expect(() => new ResizeImageMenuCommand(asController(ctrl)).execute('6 100 200')).toThrow();
            expect(ctrl.resizeImage).not.toHaveBeenCalled();
        });

        it('throws on width 0', () => {
            const ctrl = createFakeController(5);
            expect(() => new ResizeImageMenuCommand(asController(ctrl)).execute('1 0 200')).toThrow();
            expect(ctrl.resizeImage).not.toHaveBeenCalled();
        });

        it('throws on width 10001', () => {
            const ctrl = createFakeController(5);
            expect(() => new ResizeImageMenuCommand(asController(ctrl)).execute('1 10001 200')).toThrow();
            expect(ctrl.resizeImage).not.toHaveBeenCalled();
        });

        it('throws on non-integer height', () => {
            const ctrl = createFakeController(5);
            expect(() => new ResizeImageMenuCommand(asController(ctrl)).execute('1 100 1.5')).toThrow();
            expect(ctrl.resizeImage).not.toHaveBeenCalled();
        });

        it('rejects "end" (not supported by ResizeImage)', () => {
            const ctrl = createFakeController(5);
            expect(() => new ResizeImageMenuCommand(asController(ctrl)).execute('end 100 200')).toThrow();
            expect(ctrl.resizeImage).not.toHaveBeenCalled();
        });
    });
});