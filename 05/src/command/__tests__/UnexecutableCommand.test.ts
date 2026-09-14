import { UnexecutableCommand } from '../UnexecutableCommand';

class TestCommand extends UnexecutableCommand {
    public executeCount = 0;
    public unexecuteCount = 0;
    public discardCount = 0;

    protected doExecute(): void {
        this.executeCount++;
    }

    protected doUnexecute(): void {
        this.unexecuteCount++;
    }

    public discard(): void {
        this.discardCount++;
    }
}

describe('UnexecutableCommand', () => {
    describe('execute', () => {
        it('calls doExecute on the first call', () => {
            const cmd = new TestCommand();
            cmd.execute();
            expect(cmd.executeCount).toBe(1);
        });

        it('does nothing on a repeated call', () => {
            const cmd = new TestCommand();
            cmd.execute();
            cmd.execute();
            cmd.execute();
            expect(cmd.executeCount).toBe(1);
        });
    });

    describe('unexecute', () => {
        it('does nothing when never executed', () => {
            const cmd = new TestCommand();
            cmd.unexecute();
            expect(cmd.unexecuteCount).toBe(0);
        });

        it('calls doUnexecute after execute', () => {
            const cmd = new TestCommand();
            cmd.execute();
            cmd.unexecute();
            expect(cmd.unexecuteCount).toBe(1);
        });

        it('does nothing on repeated unexecute', () => {
            const cmd = new TestCommand();
            cmd.execute();
            cmd.unexecute();
            cmd.unexecute();
            expect(cmd.unexecuteCount).toBe(1);
        });
    });

    describe('execute / unexecute cycles', () => {
        it('allows re-execute after unexecute', () => {
            const cmd = new TestCommand();
            cmd.execute();
            cmd.unexecute();
            cmd.execute();
            expect(cmd.executeCount).toBe(2);
            expect(cmd.unexecuteCount).toBe(1);
        });

        it('supports many cycles', () => {
            const cmd = new TestCommand();
            for (let i = 0; i < 5; i++) {
                cmd.execute();
                cmd.unexecute();
            }
            expect(cmd.executeCount).toBe(5);
            expect(cmd.unexecuteCount).toBe(5);
        });
    });

    describe('tryMerge (default)', () => {
        it('returns false by default', () => {
            const a = new TestCommand();
            const b = new TestCommand();
            expect(a.tryMerge(b)).toBe(false);
        });
    });

    describe('discard (default)', () => {
        it('is a no-op by default', () => {
            const base = new (class extends UnexecutableCommand {
                protected doExecute(): void { }
                protected doUnexecute(): void { }
            })();
            expect(() => base.discard()).not.toThrow();
        });
    });
});