import { Menu } from '../Menu';
import { IMenuCommand } from '../commands/IMenuCommand';

class FakeMenuCommand implements IMenuCommand {
    public calls: string[] = [];

    constructor(
        private _name: string,
        private _description: string = 'desc',
        private _usage: string = 'usage',
    ) { }

    execute(args?: string): void {
        this.calls.push(args ?? '');
    }

    getName(): string { return this._name; }
    getDescription(): string { return this._description; }
    getUsage(): string { return this._usage; }
}

describe('Menu', () => {
    describe('construction', () => {
        it('accepts an empty list', () => {
            const menu = new Menu([]);
            expect(menu.getCommands().length).toBe(1);
        });

        it('adds Help automatically', () => {
            const menu = new Menu([]);
            const names = menu.getCommands().map(c => c.getName());
            expect(names).toContain('Help');
        });

        it('keeps the provided commands', () => {
            const a = new FakeMenuCommand('A');
            const b = new FakeMenuCommand('B');
            const menu = new Menu([a, b]);
            const names = menu.getCommands().map(c => c.getName());
            expect(names).toContain('A');
            expect(names).toContain('B');
            expect(names).toContain('Help');
        });

        it('does not mutate the original array', () => {
            const list: IMenuCommand[] = [new FakeMenuCommand('A')];
            new Menu(list);
            expect(list.length).toBe(1);
        });
    });

    describe('executeCommand', () => {
        it('calls the matching command with args', () => {
            const a = new FakeMenuCommand('A');
            const menu = new Menu([a]);
            menu.executeCommand('A', 'hello world');
            expect(a.calls).toEqual(['hello world']);
        });

        it('passes empty args when none given', () => {
            const a = new FakeMenuCommand('A');
            const menu = new Menu([a]);
            menu.executeCommand('A', '');
            expect(a.calls).toEqual(['']);
        });

        it('throws on unknown command', () => {
            const menu = new Menu([]);
            expect(() => menu.executeCommand('Nope', '')).toThrow(/not found/);
        });

        it('includes the unknown name in the error message', () => {
            const menu = new Menu([]);
            expect(() => menu.executeCommand('Foo', '')).toThrow(/Foo/);
        });

        it('is case-sensitive', () => {
            const a = new FakeMenuCommand('Insert');
            const menu = new Menu([a]);
            expect(() => menu.executeCommand('insert', '')).toThrow(/not found/);
        });

        it('dispatches to the correct command when several share prefixes', () => {
            const a = new FakeMenuCommand('InsertParagraph');
            const b = new FakeMenuCommand('InsertImage');
            const menu = new Menu([a, b]);
            menu.executeCommand('InsertImage', 'x y z');
            expect(a.calls).toEqual([]);
            expect(b.calls).toEqual(['x y z']);
        });
    });

    describe('getCommands', () => {
        it('returns commands in registration order, then Help last', () => {
            const a = new FakeMenuCommand('A');
            const b = new FakeMenuCommand('B');
            const menu = new Menu([a, b]);
            const names = menu.getCommands().map(c => c.getName());
            expect(names).toEqual(['A', 'B', 'Help']);
        });
    });
});