import { ListMenuCommand } from '../ListMenuCommand';
import { Paragraph } from '../../../document/items/Paragraph';
import { Image } from '../../../document/items/Image';
import { createFakeController, asController } from './helpers/fakeController';

describe('ListMenuCommand', () => {
    let logs: string[];
    let originalLog: typeof console.log;

    beforeEach(() => {
        logs = [];
        originalLog = console.log;
        console.log = jest.fn((...args: unknown[]) => {
            logs.push(args.map(String).join(' '));
        });
    });

    afterEach(() => {
        console.log = originalLog;
    });

    it('prints "Title: <title>"', () => {
        const ctrl = createFakeController();
        ctrl.getTitle.mockReturnValue('My doc');
        ctrl.getItems.mockReturnValue([]);
        new ListMenuCommand(asController(ctrl)).execute();
        expect(logs.join('\n')).toContain('Title: My doc');
    });

    it('prints each item with 1-based numbering', () => {
        const ctrl = createFakeController();
        const p1 = new Paragraph('first');
        const p2 = new Paragraph('second');
        ctrl.getItems.mockReturnValue([p1, p2]);

        new ListMenuCommand(asController(ctrl)).execute();

        const output = logs.join('\n');
        expect(output).toContain('1. ');
        expect(output).toContain('2. ');
    });

    it('calls controller.getTitle and getItems exactly once', () => {
        const ctrl = createFakeController();
        new ListMenuCommand(asController(ctrl)).execute();
        expect(ctrl.getTitle).toHaveBeenCalledTimes(1);
        expect(ctrl.getItems).toHaveBeenCalledTimes(1);
    });

    it('does not throw on empty document', () => {
        const ctrl = createFakeController();
        expect(() => new ListMenuCommand(asController(ctrl)).execute()).not.toThrow();
    });

    it('mixes paragraphs and images', () => {
        const ctrl = createFakeController();
        const p = new Paragraph('para');
        const img = new Image('cat.png', 100, 200);
        ctrl.getItems.mockReturnValue([p, img]);

        new ListMenuCommand(asController(ctrl)).execute();

        const output = logs.join('\n');
        expect(output).toContain('1. ');
        expect(output).toContain('2. ');
    });

    it('exposes metadata', () => {
        const ctrl = createFakeController();
        const cmd = new ListMenuCommand(asController(ctrl));
        expect(cmd.getName()).toBe('List');
        expect(cmd.getUsage()).toBe('List');
    });
});