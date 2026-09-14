import { History } from '../History';
import { IUnexecutableCommand } from '../../command/IUnexecutableCommand';

class FakeCommand implements IUnexecutableCommand {
    public executeCount = 0;
    public unexecuteCount = 0;
    public discardCount = 0;
    public mergeResult = false;
    public mergeTarget: FakeCommand | null = null;

    execute(): void {
        this.executeCount++;
    }

    unexecute(): void {
        this.unexecuteCount++;
    }

    tryMerge(command: IUnexecutableCommand): boolean {
        if (this.mergeResult && command instanceof FakeCommand) {
            this.mergeTarget = command;
            return true;
        }
        return false;
    }

    discard(): void {
        this.discardCount++;
    }
}

describe('History', () => {
    describe('addAndExecuteCommand', () => {
        it('executes the command', () => {
            const h = new History();
            const cmd = new FakeCommand();
            h.addAndExecuteCommand(cmd);
            expect(cmd.executeCount).toBe(1);
        });

        it('makes undo available', () => {
            const h = new History();
            h.addAndExecuteCommand(new FakeCommand());
            expect(h.canUndo()).toBe(true);
        });

        it('makes redo unavailable on fresh history', () => {
            const h = new History();
            expect(h.canRedo()).toBe(false);
        });
    });

    describe('undo', () => {
        it('unexecutes the last command', () => {
            const h = new History();
            const cmd = new FakeCommand();
            h.addAndExecuteCommand(cmd);
            h.undo();
            expect(cmd.unexecuteCount).toBe(1);
        });

        it('undoes commands in reverse order', () => {
            const h = new History();
            const order: number[] = [];

            const mk = (id: number): IUnexecutableCommand => ({
                execute: () => { },
                unexecute: () => { order.push(id); },
                tryMerge: () => false,
                discard: () => { },
            });

            h.addAndExecuteCommand(mk(1));
            h.addAndExecuteCommand(mk(2));
            h.addAndExecuteCommand(mk(3));

            h.undo();
            h.undo();
            h.undo();

            expect(order).toEqual([3, 2, 1]);
        });

        it('is a no-op on empty history', () => {
            const h = new History();
            expect(() => h.undo()).not.toThrow();
        });

        it('disables undo after undoing all commands', () => {
            const h = new History();
            h.addAndExecuteCommand(new FakeCommand());
            h.undo();
            expect(h.canUndo()).toBe(false);
        });
    });

    describe('redo', () => {
        it('re-executes the last undone command', () => {
            const h = new History();
            const cmd = new FakeCommand();
            h.addAndExecuteCommand(cmd);
            h.undo();
            h.redo();
            expect(cmd.executeCount).toBe(2);
        });

        it('redoes commands in original order', () => {
            const h = new History();
            const order: number[] = [];

            const mk = (id: number): IUnexecutableCommand => ({
                execute: () => { order.push(id); },
                unexecute: () => { },
                tryMerge: () => false,
                discard: () => { },
            });

            h.addAndExecuteCommand(mk(1));
            h.addAndExecuteCommand(mk(2));
            h.addAndExecuteCommand(mk(3));

            order.length = 0;

            h.undo();
            h.undo();
            h.undo();

            h.redo();
            h.redo();
            h.redo();

            expect(order).toEqual([1, 2, 3]);
        });

        it('is a no-op on fresh history', () => {
            const h = new History();
            expect(() => h.redo()).not.toThrow();
        });

        it('disables redo after redoing everything', () => {
            const h = new History();
            h.addAndExecuteCommand(new FakeCommand());
            h.undo();
            h.redo();
            expect(h.canRedo()).toBe(false);
        });
    });

    describe('clearing redo branch', () => {
        it('a new command after undo discards the redo branch', () => {
            const h = new History();
            const a = new FakeCommand();
            h.addAndExecuteCommand(a);
            h.undo();

            const b = new FakeCommand();
            h.addAndExecuteCommand(b);

            expect(h.canRedo()).toBe(false);
            expect(a.discardCount).toBe(1);
        });

        it('commands in redo branch receive discard on new action', () => {
            const h = new History();
            const a = new FakeCommand();
            h.addAndExecuteCommand(a);
            h.undo();

            h.addAndExecuteCommand(new FakeCommand());

            expect(a.discardCount).toBe(1);
        });

        it('all redo commands get discarded, not just the last', () => {
            const h = new History();
            const a = new FakeCommand();
            const b = new FakeCommand();
            h.addAndExecuteCommand(a);
            h.addAndExecuteCommand(b);
            h.undo();
            h.undo();

            h.addAndExecuteCommand(new FakeCommand());

            expect(a.discardCount).toBe(1);
            expect(b.discardCount).toBe(1);
        });
    });

    describe('merge', () => {
        it('does not push a merged command', () => {
            const h = new History();
            const a = new FakeCommand();
            a.mergeResult = true;
            h.addAndExecuteCommand(a);

            const b = new FakeCommand();
            h.addAndExecuteCommand(b);

            h.undo();
            expect(a.unexecuteCount).toBe(1);
        });

        it('merged command is still executed', () => {
            const h = new History();
            const a = new FakeCommand();
            a.mergeResult = true;
            h.addAndExecuteCommand(a);

            const b = new FakeCommand();
            h.addAndExecuteCommand(b);

            expect(b.executeCount).toBe(1);
        });

        it('does not merge when a redo branch exists', () => {
            const h = new History();
            const a = new FakeCommand();
            a.mergeResult = true;
            h.addAndExecuteCommand(a);
            h.undo();

            const b = new FakeCommand();
            h.addAndExecuteCommand(b);

            h.undo();
            expect(b.unexecuteCount).toBe(1);
        });

        it('does not merge when history is empty', () => {
            const h = new History();
            const cmd = new FakeCommand();
            cmd.mergeResult = true;
            expect(() => h.addAndExecuteCommand(cmd)).not.toThrow();
            expect(cmd.executeCount).toBe(1);
        });
    });

    describe('HISTORY_LIMIT (10 commands)', () => {
        it('keeps at most 10 undos', () => {
            const h = new History();
            const cmds: FakeCommand[] = [];
            for (let i = 0; i < 12; i++) {
                const c = new FakeCommand();
                cmds.push(c);
                h.addAndExecuteCommand(c);
            }

            expect(cmds[0].discardCount).toBe(1);
            expect(cmds[1].discardCount).toBe(1);
            expect(cmds[2].discardCount).toBe(0);
            expect(cmds[11].discardCount).toBe(0);
        });

        it('allows exactly 10 undos without discard', () => {
            const h = new History();
            const cmds: FakeCommand[] = [];
            for (let i = 0; i < 10; i++) {
                const c = new FakeCommand();
                cmds.push(c);
                h.addAndExecuteCommand(c);
            }
            for (const c of cmds) {
                expect(c.discardCount).toBe(0);
            }
        });

        it('discards the oldest command when the 11th arrives', () => {
            const h = new History();
            const first = new FakeCommand();
            h.addAndExecuteCommand(first);
            for (let i = 0; i < 10; i++) {
                h.addAndExecuteCommand(new FakeCommand());
            }
            expect(first.discardCount).toBe(1);
        });

        it('after limit + undo, oldest command is no longer undoable', () => {
            const h = new History();
            const first = new FakeCommand();
            h.addAndExecuteCommand(first);
            for (let i = 0; i < 10; i++) {
                h.addAndExecuteCommand(new FakeCommand());
            }

            for (let i = 0; i < 10; i++) h.undo();

            expect(first.unexecuteCount).toBe(0);
        });
    });

    describe('canUndo / canRedo', () => {
        it('starts false / false', () => {
            const h = new History();
            expect(h.canUndo()).toBe(false);
            expect(h.canRedo()).toBe(false);
        });

        it('after one command: true / false', () => {
            const h = new History();
            h.addAndExecuteCommand(new FakeCommand());
            expect(h.canUndo()).toBe(true);
            expect(h.canRedo()).toBe(false);
        });

        it('after undo: false / true', () => {
            const h = new History();
            h.addAndExecuteCommand(new FakeCommand());
            h.undo();
            expect(h.canUndo()).toBe(false);
            expect(h.canRedo()).toBe(true);
        });

        it('after redo: true / false', () => {
            const h = new History();
            h.addAndExecuteCommand(new FakeCommand());
            h.undo();
            h.redo();
            expect(h.canUndo()).toBe(true);
            expect(h.canRedo()).toBe(false);
        });
    });
});