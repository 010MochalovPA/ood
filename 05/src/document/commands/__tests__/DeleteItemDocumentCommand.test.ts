import { DeleteItemDocumentCommand } from '../DeleteItemDocumentCommand';
import { Document } from '../../Document';
import { Paragraph } from '../../items/Paragraph';
import { Image } from '../../items/Image';
import { asStorage, createFakeStorage } from './helpers/fakeStorage';

describe('DeleteItemDocumentCommand', () => {
    describe('construction', () => {
        it('acquires the resource for an image', () => {
            const storage = createFakeStorage();
            const doc = new Document();
            const img = new Image('cat.png', 10, 10);
            doc.insertItem(0, img);

            new DeleteItemDocumentCommand(doc, 0, img, asStorage(storage));

            expect(storage.acquire).toHaveBeenCalledTimes(1);
            expect(storage.acquire).toHaveBeenCalledWith('cat.png');
        });

        it('does not call storage.acquire for a paragraph (no-op)', () => {
            const storage = createFakeStorage();
            const doc = new Document();
            const p = new Paragraph('hello');
            doc.insertItem(0, p);

            new DeleteItemDocumentCommand(doc, 0, p, asStorage(storage));

            expect(storage.acquire).not.toHaveBeenCalled();
        });
    });

    describe('execute', () => {
        it('removes the item from the document', () => {
            const storage = createFakeStorage();
            const doc = new Document();
            const p = new Paragraph('hello');
            doc.insertItem(0, p);

            const cmd = new DeleteItemDocumentCommand(doc, 0, p, asStorage(storage));
            cmd.execute();

            expect(doc.getItemsCount()).toBe(0);
        });

        it('releases the resource for an image', () => {
            const storage = createFakeStorage();
            const doc = new Document();
            const img = new Image('cat.png', 10, 10);
            doc.insertItem(0, img);

            const cmd = new DeleteItemDocumentCommand(doc, 0, img, asStorage(storage));
            cmd.execute();

            expect(storage.release).toHaveBeenCalledTimes(1);
            expect(storage.release).toHaveBeenCalledWith('cat.png');
        });

        it('deletes the correct item from the middle', () => {
            const storage = createFakeStorage();
            const doc = new Document();
            const a = new Paragraph('a');
            const b = new Paragraph('b');
            const c = new Paragraph('c');
            doc.insertItem(0, a);
            doc.insertItem(1, b);
            doc.insertItem(2, c);

            const cmd = new DeleteItemDocumentCommand(doc, 1, b, asStorage(storage));
            cmd.execute();

            expect(doc.getItemsCount()).toBe(2);
            expect(doc.getItem(0)).toBe(a);
            expect(doc.getItem(1)).toBe(c);
        });

        it('does not touch the resource for a paragraph', () => {
            const storage = createFakeStorage();
            const doc = new Document();
            const p = new Paragraph('hello');
            doc.insertItem(0, p);

            const cmd = new DeleteItemDocumentCommand(doc, 0, p, asStorage(storage));
            cmd.execute();

            expect(storage.release).not.toHaveBeenCalled();
        });
    });

    describe('unexecute', () => {
        it('restores the item at the original position', () => {
            const storage = createFakeStorage();
            const doc = new Document();
            const p = new Paragraph('hello');
            doc.insertItem(0, p);

            const cmd = new DeleteItemDocumentCommand(doc, 0, p, asStorage(storage));
            cmd.execute();
            cmd.unexecute();

            expect(doc.getItemsCount()).toBe(1);
            expect(doc.getItem(0)).toBe(p);
        });

        it('restores in the middle at the correct position', () => {
            const storage = createFakeStorage();
            const doc = new Document();
            const a = new Paragraph('a');
            const b = new Paragraph('b');
            const c = new Paragraph('c');
            doc.insertItem(0, a);
            doc.insertItem(1, b);
            doc.insertItem(2, c);

            const cmd = new DeleteItemDocumentCommand(doc, 1, b, asStorage(storage));
            cmd.execute();
            cmd.unexecute();

            expect(doc.getItemsCount()).toBe(3);
            expect(doc.getItem(0)).toBe(a);
            expect(doc.getItem(1)).toBe(b);
            expect(doc.getItem(2)).toBe(c);
        });

        it('acquires the resource again', () => {
            const storage = createFakeStorage();
            const doc = new Document();
            const img = new Image('cat.png', 10, 10);
            doc.insertItem(0, img);

            const cmd = new DeleteItemDocumentCommand(doc, 0, img, asStorage(storage));
            cmd.execute();
            cmd.unexecute();

            expect(storage.acquire).toHaveBeenCalledTimes(2);
            expect(storage.release).toHaveBeenCalledTimes(1);
        });

        it('is idempotent on repeated unexecute', () => {
            const storage = createFakeStorage();
            const doc = new Document();
            const img = new Image('cat.png', 10, 10);
            doc.insertItem(0, img);

            const cmd = new DeleteItemDocumentCommand(doc, 0, img, asStorage(storage));
            cmd.execute();
            cmd.unexecute();
            cmd.unexecute();

            expect(doc.getItemsCount()).toBe(1);
            expect(storage.acquire).toHaveBeenCalledTimes(2);
        });
    });

    describe('discard', () => {
        it('releases the resource', () => {
            const storage = createFakeStorage();
            const doc = new Document();
            const img = new Image('cat.png', 10, 10);
            doc.insertItem(0, img);

            const cmd = new DeleteItemDocumentCommand(doc, 0, img, asStorage(storage));
            cmd.execute();
            cmd.discard();

            expect(storage.release).toHaveBeenCalledTimes(2);
        });

        it('does not touch the document', () => {
            const storage = createFakeStorage();
            const doc = new Document();
            const p = new Paragraph('hello');
            doc.insertItem(0, p);

            const cmd = new DeleteItemDocumentCommand(doc, 0, p, asStorage(storage));
            cmd.discard();

            expect(doc.getItemsCount()).toBe(1);
        });
    });

    describe('tryMerge (default)', () => {
        it('does not merge with another DeleteItem command', () => {
            const storage = createFakeStorage();
            const doc = new Document();
            const p1 = new Paragraph('a');
            const p2 = new Paragraph('b');
            doc.insertItem(0, p1);
            doc.insertItem(1, p2);

            const a = new DeleteItemDocumentCommand(doc, 0, p1, asStorage(storage));
            const b = new DeleteItemDocumentCommand(doc, 1, p2, asStorage(storage));

            expect(a.tryMerge(b)).toBe(false);
        });
    });
});