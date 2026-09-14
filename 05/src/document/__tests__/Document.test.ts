import { Document } from '../Document';
import { Paragraph } from '../items/Paragraph';
import { Image } from '../items/Image';

describe('Document', () => {
    describe('construction', () => {
        it('starts with default title', () => {
            const doc = new Document();
            expect(doc.getTitle()).toBe('New title');
        });

        it('accepts a custom title', () => {
            const doc = new Document('My doc');
            expect(doc.getTitle()).toBe('My doc');
        });

        it('starts empty', () => {
            const doc = new Document();
            expect(doc.getItemsCount()).toBe(0);
            expect(doc.getItems()).toEqual([]);
        });
    });

    describe('title', () => {
        it('setTitle replaces the title', () => {
            const doc = new Document('A');
            doc.setTitle('B');
            expect(doc.getTitle()).toBe('B');
        });

        it('setTitle accepts empty string', () => {
            const doc = new Document('A');
            doc.setTitle('');
            expect(doc.getTitle()).toBe('');
        });
    });

    describe('insertItem', () => {
        it('appends at position 0 for empty document', () => {
            const doc = new Document();
            const p = new Paragraph('a');
            doc.insertItem(0, p);
            expect(doc.getItemsCount()).toBe(1);
            expect(doc.getItem(0)).toBe(p);
        });

        it('inserts at the beginning', () => {
            const doc = new Document();
            const a = new Paragraph('a');
            const b = new Paragraph('b');
            doc.insertItem(0, a);
            doc.insertItem(0, b);
            expect(doc.getItem(0)).toBe(b);
            expect(doc.getItem(1)).toBe(a);
        });

        it('inserts at the end using position === length', () => {
            const doc = new Document();
            const a = new Paragraph('a');
            const b = new Paragraph('b');
            doc.insertItem(0, a);
            doc.insertItem(1, b);
            expect(doc.getItem(0)).toBe(a);
            expect(doc.getItem(1)).toBe(b);
        });

        it('inserts in the middle and shifts subsequent items', () => {
            const doc = new Document();
            const a = new Paragraph('a');
            const b = new Paragraph('b');
            const c = new Paragraph('c');
            doc.insertItem(0, a);
            doc.insertItem(1, b);
            doc.insertItem(1, c);
            expect(doc.getItem(0)).toBe(a);
            expect(doc.getItem(1)).toBe(c);
            expect(doc.getItem(2)).toBe(b);
        });

        it('rejects negative position', () => {
            const doc = new Document();
            expect(() => doc.insertItem(-1, new Paragraph('a'))).toThrow(/out of range/);
        });

        it('rejects position above length', () => {
            const doc = new Document();
            doc.insertItem(0, new Paragraph('a'));
            expect(() => doc.insertItem(2, new Paragraph('b'))).toThrow(/out of range/);
        });

        it('accepts position 0 for empty document', () => {
            const doc = new Document();
            expect(() => doc.insertItem(0, new Paragraph('a'))).not.toThrow();
        });
    });

    describe('insertParagraph / insertImage helpers', () => {
        it('insertParagraph delegates to insertItem', () => {
            const doc = new Document();
            const p = new Paragraph('hi');
            doc.insertParagraph(p, 0);
            expect(doc.getItem(0)).toBe(p);
        });

        it('insertImage delegates to insertItem', () => {
            const doc = new Document();
            const img = new Image('cat.png', 10, 10);
            doc.insertImage(img, 0);
            expect(doc.getItem(0)).toBe(img);
        });

        it('mixes paragraphs and images in order', () => {
            const doc = new Document();
            const p1 = new Paragraph('p1');
            const img = new Image('cat.png', 1, 1);
            const p2 = new Paragraph('p2');
            doc.insertParagraph(p1, 0);
            doc.insertImage(img, 1);
            doc.insertParagraph(p2, 2);
            expect(doc.getItem(0)).toBe(p1);
            expect(doc.getItem(1)).toBe(img);
            expect(doc.getItem(2)).toBe(p2);
        });
    });

    describe('getItem', () => {
        it('returns the item at a valid index', () => {
            const doc = new Document();
            const p = new Paragraph('a');
            doc.insertItem(0, p);
            expect(doc.getItem(0)).toBe(p);
        });

        it('rejects negative index', () => {
            const doc = new Document();
            expect(() => doc.getItem(-1)).toThrow(/out of range/);
        });

        it('rejects index equal to length (empty doc)', () => {
            const doc = new Document();
            expect(() => doc.getItem(0)).toThrow(/out of range/);
        });

        it('rejects index above length', () => {
            const doc = new Document();
            doc.insertItem(0, new Paragraph('a'));
            expect(() => doc.getItem(1)).toThrow(/out of range/);
        });
    });

    describe('deleteItem', () => {
        it('removes the item at the given index', () => {
            const doc = new Document();
            const a = new Paragraph('a');
            const b = new Paragraph('b');
            doc.insertItem(0, a);
            doc.insertItem(1, b);
            doc.deleteItem(0);
            expect(doc.getItemsCount()).toBe(1);
            expect(doc.getItem(0)).toBe(b);
        });

        it('removes the last remaining item', () => {
            const doc = new Document();
            doc.insertItem(0, new Paragraph('a'));
            doc.deleteItem(0);
            expect(doc.getItemsCount()).toBe(0);
        });

        it('rejects negative index', () => {
            const doc = new Document();
            expect(() => doc.deleteItem(-1)).toThrow(/out of range/);
        });

        it('rejects index equal to length', () => {
            const doc = new Document();
            expect(() => doc.deleteItem(0)).toThrow(/out of range/);
        });

        it('rejects index above length', () => {
            const doc = new Document();
            doc.insertItem(0, new Paragraph('a'));
            expect(() => doc.deleteItem(5)).toThrow(/out of range/);
        });
    });

    describe('getItemsCount', () => {
        it('returns 0 for new document', () => {
            expect(new Document().getItemsCount()).toBe(0);
        });

        it('increments with each insert', () => {
            const doc = new Document();
            doc.insertItem(0, new Paragraph('a'));
            doc.insertItem(1, new Paragraph('b'));
            expect(doc.getItemsCount()).toBe(2);
        });

        it('decrements with each delete', () => {
            const doc = new Document();
            doc.insertItem(0, new Paragraph('a'));
            doc.insertItem(1, new Paragraph('b'));
            doc.deleteItem(0);
            expect(doc.getItemsCount()).toBe(1);
        });
    });

    describe('getItems', () => {
        it('returns all items in order', () => {
            const doc = new Document();
            const a = new Paragraph('a');
            const b = new Paragraph('b');
            doc.insertItem(0, a);
            doc.insertItem(1, b);
            expect(doc.getItems()).toEqual([a, b]);
        });

        it('returns a copy that does not affect the document', () => {
            const doc = new Document();
            doc.insertItem(0, new Paragraph('a'));
            const items = doc.getItems();
            items.length = 0;
            expect(doc.getItemsCount()).toBe(1);
        });
    });
});