import { InsertParagraphDocumentCommand } from '../InsertParagraphDocumentCommand';
import { Document } from '../../Document';
import { Paragraph } from '../../items/Paragraph';

describe('InsertParagraphDocumentCommand', () => {
    describe('execute', () => {
        it('inserts a paragraph into an empty document', () => {
            const doc = new Document();
            const cmd = new InsertParagraphDocumentCommand(doc, 'hello', 0);
            cmd.execute();
            expect(doc.getItemsCount()).toBe(1);
            const p = doc.getItem(0);
            expect(p).toBeInstanceOf(Paragraph);
            expect((p as Paragraph).text).toBe('hello');
        });

        it('appends at the end when position === count', () => {
            const doc = new Document();
            doc.insertItem(0, new Paragraph('first'));
            const cmd = new InsertParagraphDocumentCommand(doc, 'second', 1);
            cmd.execute();
            expect(doc.getItemsCount()).toBe(2);
            expect((doc.getItem(1) as Paragraph).text).toBe('second');
        });

        it('inserts in the middle and shifts subsequent items', () => {
            const doc = new Document();
            const a = new Paragraph('a');
            const b = new Paragraph('b');
            doc.insertItem(0, a);
            doc.insertItem(1, b);

            const cmd = new InsertParagraphDocumentCommand(doc, 'mid', 1);
            cmd.execute();

            expect(doc.getItem(0)).toBe(a);
            expect((doc.getItem(1) as Paragraph).text).toBe('mid');
            expect(doc.getItem(2)).toBe(b);
        });

        it('throws for position above length', () => {
            const doc = new Document();
            const cmd = new InsertParagraphDocumentCommand(doc, 'x', 5);
            expect(() => cmd.execute()).toThrow();
        });

        it('accepts empty text at command level (validation is upstream)', () => {
            const doc = new Document();
            const cmd = new InsertParagraphDocumentCommand(doc, '', 0);
            cmd.execute();
            expect((doc.getItem(0) as Paragraph).text).toBe('');
        });
    });

    describe('unexecute', () => {
        it('removes the inserted paragraph', () => {
            const doc = new Document();
            const cmd = new InsertParagraphDocumentCommand(doc, 'hello', 0);
            cmd.execute();
            cmd.unexecute();
            expect(doc.getItemsCount()).toBe(0);
        });

        it('restores surrounding items at their original positions', () => {
            const doc = new Document();
            const a = new Paragraph('a');
            const b = new Paragraph('b');
            doc.insertItem(0, a);
            doc.insertItem(1, b);

            const cmd = new InsertParagraphDocumentCommand(doc, 'mid', 1);
            cmd.execute();
            cmd.unexecute();

            expect(doc.getItemsCount()).toBe(2);
            expect(doc.getItem(0)).toBe(a);
            expect(doc.getItem(1)).toBe(b);
        });

        it('is idempotent', () => {
            const doc = new Document();
            const cmd = new InsertParagraphDocumentCommand(doc, 'x', 0);
            cmd.execute();
            cmd.unexecute();
            cmd.unexecute();
            expect(doc.getItemsCount()).toBe(0);
        });
    });

    describe('execute / unexecute cycles', () => {
        it('supports execute → unexecute → execute', () => {
            const doc = new Document();
            const cmd = new InsertParagraphDocumentCommand(doc, 'hello', 0);
            cmd.execute();
            cmd.unexecute();
            cmd.execute();
            expect(doc.getItemsCount()).toBe(1);
        });

        it('creates a new Paragraph instance on re-execute (documents current behavior)', () => {
            const doc = new Document();
            const cmd = new InsertParagraphDocumentCommand(doc, 'hello', 0);
            cmd.execute();
            const first = doc.getItem(0);
            cmd.unexecute();
            cmd.execute();
            const second = doc.getItem(0);
            expect(second).not.toBe(first);
            expect((second as Paragraph).text).toBe('hello');
        });
    });

    describe('tryMerge (default)', () => {
        it('does not merge with another InsertParagraph command', () => {
            const doc = new Document();
            const a = new InsertParagraphDocumentCommand(doc, 'a', 0);
            const b = new InsertParagraphDocumentCommand(doc, 'b', 1);
            expect(a.tryMerge(b)).toBe(false);
        });
    });
});