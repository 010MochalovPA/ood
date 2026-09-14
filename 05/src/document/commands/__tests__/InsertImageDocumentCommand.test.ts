import { InsertImageDocumentCommand } from '../InsertImageDocumentCommand';
import { Document } from '../../Document';
import { Image } from '../../items/Image';
import { asStorage, createFakeStorage } from './helpers/fakeStorage';

describe('InsertImageDocumentCommand', () => {
    describe('construction', () => {
        it('acquires the resource (command holds it)', () => {
            const storage = createFakeStorage();
            const doc = new Document();
            const img = new Image('cat.png', 10, 10);

            new InsertImageDocumentCommand(doc, img, 0, asStorage(storage));

            expect(storage.acquire).toHaveBeenCalledTimes(1);
            expect(storage.acquire).toHaveBeenCalledWith('cat.png');
        });

        it('does not touch the document', () => {
            const storage = createFakeStorage();
            const doc = new Document();
            const img = new Image('cat.png', 10, 10);

            new InsertImageDocumentCommand(doc, img, 0, asStorage(storage));

            expect(doc.getItemsCount()).toBe(0);
        });
    });

    describe('execute', () => {
        it('inserts the image into the document', () => {
            const storage = createFakeStorage();
            const doc = new Document();
            const img = new Image('cat.png', 10, 10);
            const cmd = new InsertImageDocumentCommand(doc, img, 0, asStorage(storage));

            cmd.execute();

            expect(doc.getItemsCount()).toBe(1);
            expect(doc.getItem(0)).toBe(img);
        });

        it('acquires the resource again (element now holds it too)', () => {
            const storage = createFakeStorage();
            const doc = new Document();
            const img = new Image('cat.png', 10, 10);
            const cmd = new InsertImageDocumentCommand(doc, img, 0, asStorage(storage));

            cmd.execute();

            expect(storage.acquire).toHaveBeenCalledTimes(2);
        });

        it('inserts at the middle position', () => {
            const storage = createFakeStorage();
            const doc = new Document();
            const before = new Image('a.png', 1, 1);
            const after = new Image('b.png', 1, 1);
            doc.insertItem(0, before);
            doc.insertItem(1, after);

            const img = new Image('cat.png', 10, 10);
            const cmd = new InsertImageDocumentCommand(doc, img, 1, asStorage(storage));
            cmd.execute();

            expect(doc.getItem(0)).toBe(before);
            expect(doc.getItem(1)).toBe(img);
            expect(doc.getItem(2)).toBe(after);
        });
    });

    describe('unexecute', () => {
        it('removes the image from the document', () => {
            const storage = createFakeStorage();
            const doc = new Document();
            const img = new Image('cat.png', 10, 10);
            const cmd = new InsertImageDocumentCommand(doc, img, 0, asStorage(storage));

            cmd.execute();
            cmd.unexecute();

            expect(doc.getItemsCount()).toBe(0);
        });

        it('releases the resource (element no longer holds it)', () => {
            const storage = createFakeStorage();
            const doc = new Document();
            const img = new Image('cat.png', 10, 10);
            const cmd = new InsertImageDocumentCommand(doc, img, 0, asStorage(storage));

            cmd.execute();
            cmd.unexecute();

            expect(storage.acquire).toHaveBeenCalledTimes(2);
            expect(storage.release).toHaveBeenCalledTimes(1);
            expect(storage.release).toHaveBeenCalledWith('cat.png');
        });

        it('is idempotent', () => {
            const storage = createFakeStorage();
            const doc = new Document();
            const img = new Image('cat.png', 10, 10);
            const cmd = new InsertImageDocumentCommand(doc, img, 0, asStorage(storage));

            cmd.execute();
            cmd.unexecute();
            cmd.unexecute();

            expect(storage.release).toHaveBeenCalledTimes(1);
        });
    });

    describe('discard', () => {
        it('releases the resource (command leaves history)', () => {
            const storage = createFakeStorage();
            const doc = new Document();
            const img = new Image('cat.png', 10, 10);
            const cmd = new InsertImageDocumentCommand(doc, img, 0, asStorage(storage));

            cmd.execute();
            cmd.unexecute();
            cmd.discard();

            expect(storage.release).toHaveBeenCalledTimes(2);
        });

        it('can be called without prior execute', () => {
            const storage = createFakeStorage();
            const doc = new Document();
            const img = new Image('cat.png', 10, 10);
            const cmd = new InsertImageDocumentCommand(doc, img, 0, asStorage(storage));

            cmd.discard();

            expect(storage.release).toHaveBeenCalledTimes(1);
        });
    });

    describe('full lifecycle', () => {
        it('acquire (ctor) → acquire (execute) → release (unexecute) → release (discard)', () => {
            const storage = createFakeStorage();
            const doc = new Document();
            const img = new Image('cat.png', 10, 10);
            const cmd = new InsertImageDocumentCommand(doc, img, 0, asStorage(storage));

            expect(storage.acquire).toHaveBeenCalledTimes(1);
            expect(storage.release).toHaveBeenCalledTimes(0);

            cmd.execute();
            expect(storage.acquire).toHaveBeenCalledTimes(2);
            expect(storage.release).toHaveBeenCalledTimes(0);

            cmd.unexecute();
            expect(storage.acquire).toHaveBeenCalledTimes(2);
            expect(storage.release).toHaveBeenCalledTimes(1);

            cmd.discard();
            expect(storage.acquire).toHaveBeenCalledTimes(2);
            expect(storage.release).toHaveBeenCalledTimes(2);
        });

        it('supports execute → unexecute → execute (redo) and keeps the image in the doc', () => {
            const storage = createFakeStorage();
            const doc = new Document();
            const img = new Image('cat.png', 10, 10);
            const cmd = new InsertImageDocumentCommand(doc, img, 0, asStorage(storage));

            cmd.execute();
            cmd.unexecute();
            cmd.execute();

            expect(doc.getItem(0)).toBe(img);
            expect(storage.acquire).toHaveBeenCalledTimes(3);
            expect(storage.release).toHaveBeenCalledTimes(1);
        });
    });
});