import { ReplaceTextDocumentCommand } from '../ReplaceTextDocumentCommand';
import { Paragraph } from '../../items/Paragraph';

describe('ReplaceTextDocumentCommand', () => {
    describe('execute / unexecute', () => {
        it('replaces the paragraph text on execute', () => {
            const p = new Paragraph('old');
            const cmd = new ReplaceTextDocumentCommand(p, 'new');
            cmd.execute();
            expect(p.text).toBe('new');
        });

        it('restores the previous text on unexecute', () => {
            const p = new Paragraph('old');
            const cmd = new ReplaceTextDocumentCommand(p, 'new');
            cmd.execute();
            cmd.unexecute();
            expect(p.text).toBe('old');
        });

        it('captures old text at construction, not at execute', () => {
            const p = new Paragraph('old');
            const cmd = new ReplaceTextDocumentCommand(p, 'new');
            p.text = 'changed-by-someone-else';
            cmd.execute();
            cmd.unexecute();
            expect(p.text).toBe('old');
        });

        it('is idempotent on repeated execute', () => {
            const p = new Paragraph('old');
            const cmd = new ReplaceTextDocumentCommand(p, 'new');
            cmd.execute();
            cmd.execute();
            expect(p.text).toBe('new');
        });

        it('is idempotent on repeated unexecute', () => {
            const p = new Paragraph('old');
            const cmd = new ReplaceTextDocumentCommand(p, 'new');
            cmd.execute();
            cmd.unexecute();
            cmd.unexecute();
            expect(p.text).toBe('old');
        });

        it('supports execute → unexecute → execute cycles', () => {
            const p = new Paragraph('original');
            const cmd = new ReplaceTextDocumentCommand(p, 'new');
            cmd.execute();
            expect(p.text).toBe('new');
            cmd.unexecute();
            expect(p.text).toBe('original');
            cmd.execute();
            expect(p.text).toBe('new');
        });
    });

    describe('getParagraph', () => {
        it('returns the target paragraph', () => {
            const p = new Paragraph('x');
            const cmd = new ReplaceTextDocumentCommand(p, 'y');
            expect(cmd.getParagraph()).toBe(p);
        });
    });

    describe('tryMerge', () => {
        it('merges with another ReplaceText command on the same paragraph', () => {
            const p = new Paragraph('x');
            const a = new ReplaceTextDocumentCommand(p, 'A');
            const b = new ReplaceTextDocumentCommand(p, 'B');
            expect(a.tryMerge(b)).toBe(true);
        });

        it('does not merge when targeting a different paragraph', () => {
            const p1 = new Paragraph('x');
            const p2 = new Paragraph('y');
            const a = new ReplaceTextDocumentCommand(p1, 'A');
            const b = new ReplaceTextDocumentCommand(p2, 'B');
            expect(a.tryMerge(b)).toBe(false);
        });

        it('does not merge with a command of a different class', () => {
            const p = new Paragraph('x');
            const a = new ReplaceTextDocumentCommand(p, 'A');
            const foreign = {
                execute: () => { },
                unexecute: () => { },
                tryMerge: () => false,
                discard: () => { },
            };
            expect(a.tryMerge(foreign as any)).toBe(false);
        });
    });

    describe('chain behavior', () => {
        it('applying the head applies all chained commands', () => {
            const p = new Paragraph('original');
            const a = new ReplaceTextDocumentCommand(p, 'A');
            const b = new ReplaceTextDocumentCommand(p, 'B');
            const c = new ReplaceTextDocumentCommand(p, 'C');
            a.tryMerge(b);
            a.tryMerge(c);

            a.execute();
            b.execute();
            c.execute();

            expect(p.text).toBe('C');
        });

        it('undoing the head reverts the whole chain', () => {
            const p = new Paragraph('original');
            const a = new ReplaceTextDocumentCommand(p, 'A');
            const b = new ReplaceTextDocumentCommand(p, 'B');
            a.tryMerge(b);

            a.execute();
            b.execute();
            a.unexecute();
            b.unexecute();

            expect(p.text).toBe('original');
        });

        it('redoing the head re-applies the whole chain', () => {
            const p = new Paragraph('original');
            const a = new ReplaceTextDocumentCommand(p, 'A');
            const b = new ReplaceTextDocumentCommand(p, 'B');
            a.tryMerge(b);

            a.execute();
            b.execute();
            a.unexecute();
            b.unexecute();
            a.execute();
            b.execute();

            expect(p.text).toBe('B');
        });
    });
});