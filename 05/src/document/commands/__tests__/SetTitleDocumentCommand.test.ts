import { SetTitleDocumentCommand } from '../SetTitleDocumentCommand';
import { Document } from '../../Document';

describe('SetTitleDocumentCommand', () => {
    describe('execute / unexecute', () => {
        it('changes the document title on execute', () => {
            const doc = new Document('original');
            const cmd = new SetTitleDocumentCommand(doc, 'new');
            cmd.execute();
            expect(doc.getTitle()).toBe('new');
        });

        it('restores the previous title on unexecute', () => {
            const doc = new Document('original');
            const cmd = new SetTitleDocumentCommand(doc, 'new');
            cmd.execute();
            cmd.unexecute();
            expect(doc.getTitle()).toBe('original');
        });

        it('captures the old title at construction, not at execute', () => {
            const doc = new Document('original');
            const cmd = new SetTitleDocumentCommand(doc, 'new');
            doc.setTitle('changed-by-someone-else');
            cmd.execute();
            cmd.unexecute();
            expect(doc.getTitle()).toBe('original');
        });

        it('is idempotent on repeated execute', () => {
            const doc = new Document('original');
            const cmd = new SetTitleDocumentCommand(doc, 'new');
            cmd.execute();
            cmd.execute();
            expect(doc.getTitle()).toBe('new');
        });

        it('is idempotent on repeated unexecute', () => {
            const doc = new Document('original');
            const cmd = new SetTitleDocumentCommand(doc, 'new');
            cmd.execute();
            cmd.unexecute();
            cmd.unexecute();
            expect(doc.getTitle()).toBe('original');
        });

        it('supports execute/unexecute cycles', () => {
            const doc = new Document('original');
            const cmd = new SetTitleDocumentCommand(doc, 'new');

            cmd.execute();
            expect(doc.getTitle()).toBe('new');

            cmd.unexecute();
            expect(doc.getTitle()).toBe('original');

            cmd.execute();
            expect(doc.getTitle()).toBe('new');
        });
    });

    describe('tryMerge', () => {
        it('merges with another SetTitleDocumentCommand', () => {
            const doc = new Document('original');
            const a = new SetTitleDocumentCommand(doc, 'A');
            const b = new SetTitleDocumentCommand(doc, 'B');
            expect(a.tryMerge(b)).toBe(true);
        });

        it('does not merge with a command of a different class', () => {
            const doc = new Document('original');
            const a = new SetTitleDocumentCommand(doc, 'A');
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
        it('applying the chain head sets the last title', () => {
            const doc = new Document('original');
            const a = new SetTitleDocumentCommand(doc, 'A');
            const b = new SetTitleDocumentCommand(doc, 'B');
            const c = new SetTitleDocumentCommand(doc, 'C');
            a.tryMerge(b);
            a.tryMerge(c);

            a.execute();
            b.execute();
            c.execute();

            expect(doc.getTitle()).toBe('C');
        });

        it('undoing the head reverts the whole chain', () => {
            const doc = new Document('original');
            const a = new SetTitleDocumentCommand(doc, 'A');
            const b = new SetTitleDocumentCommand(doc, 'B');
            a.tryMerge(b);

            a.execute();
            b.execute();

            a.unexecute();
            b.unexecute();

            expect(doc.getTitle()).toBe('original');
        });

        it('redoing the head re-applies the whole chain', () => {
            const doc = new Document('original');
            const a = new SetTitleDocumentCommand(doc, 'A');
            const b = new SetTitleDocumentCommand(doc, 'B');
            a.tryMerge(b);

            a.execute();
            b.execute();
            a.unexecute();
            b.unexecute();

            a.execute();
            b.execute();

            expect(doc.getTitle()).toBe('B');
        });
    });
});