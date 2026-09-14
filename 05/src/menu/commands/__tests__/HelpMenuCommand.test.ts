import { HelpMenuCommand } from '../HelpMenuCommand';
import { Menu } from '../../Menu';
import { IMenuCommand } from '../IMenuCommand';

class FakeMenuCommand implements IMenuCommand {
    constructor(
        private _name: string,
        private _description: string,
        private _usage: string,
    ) { }
    execute(): void { }
    getName(): string { return this._name; }
    getDescription(): string { return this._description; }
    getUsage(): string { return this._usage; }
}

describe('HelpMenuCommand', () => {
    let logs: string[];
    let originalLog: typeof console.log;

    beforeEach(() => {
        logs = [];
        originalLog = console.log;
        console.log = jest.fn((...args: unknown[]) => {
            logs.push(args.map(String).join(' '));
        });
    });

    afterEach(() => { console.log = originalLog; });

    it('exposes metadata', () => {
        const cmd = new HelpMenuCommand(new Menu([]));
        expect(cmd.getName()).toBe('Help');
        expect(cmd.getUsage()).toBe('Help');
        expect(cmd.getDescription().length).toBeGreaterThan(0);
    });

    it('prints a header', () => {
        new HelpMenuCommand(new Menu([])).execute();
        expect(logs.join('\n')).toMatch(/Available commands/);
    });

    it('prints every command usage and description', () => {
        const menu = new Menu([
            new FakeMenuCommand('Foo', 'do foo', 'Foo <x>'),
            new FakeMenuCommand('Bar', 'do bar', 'Bar <y>'),
        ]);
        new HelpMenuCommand(menu).execute();
        const output = logs.join('\n');
        expect(output).toContain('Foo <x>');
        expect(output).toContain('do foo');
        expect(output).toContain('Bar <y>');
        expect(output).toContain('do bar');
    });
});