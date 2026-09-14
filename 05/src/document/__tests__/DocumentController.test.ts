import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { DocumentController } from '../DocumentController';
import { Document } from '../Document';
import { History } from '../../history/History';
import { FileStorage } from '../../storage/FileStorage';
import { Paragraph } from '../items/Paragraph';
import { Image } from '../items/Image';

describe('DocumentController', () => {
    let tmpDir: string;
    let controller: DocumentController;

    beforeEach(() => {
        tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'doc-controller-test-'));
        controller = new DocumentController({
            document: new Document(),
            history: new History(),
            storage: new FileStorage(tmpDir),
        });
    });

    afterEach(() => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
    });

    const writeImage = (name: string, content = 'img'): string => {
        const p = path.join(tmpDir, name);
        fs.writeFileSync(p, content);
        return p;
    };

    describe('insertParagraph', () => {
        it('inserts a paragraph at position 0', () => {
            controller.insertParagraph({ text: 'hello', position: 0 });
            expect(controller.getItemsCount()).toBe(1);
            expect((controller.getItems()[0] as Paragraph).text).toBe('hello');
        });

        it('appends at the end when position === count', () => {
            controller.insertParagraph({ text: 'a', position: 0 });
            controller.insertParagraph({ text: 'b', position: 1 });
            expect(controller.getItemsCount()).toBe(2);
            expect((controller.getItems()[1] as Paragraph).text).toBe('b');
        });

        it('inserts in the middle and shifts subsequent items', () => {
            controller.insertParagraph({ text: 'a', position: 0 });
            controller.insertParagraph({ text: 'b', position: 1 });
            controller.insertParagraph({ text: 'c', position: 1 });

            const items = controller.getItems() as Paragraph[];
            expect(items.map(p => p.text)).toEqual(['a', 'c', 'b']);
        });

        it('throws on out-of-range position', () => {
            expect(() => controller.insertParagraph({ text: 'x', position: 5 })).toThrow();
        });

        it('throws on negative position', () => {
            expect(() => controller.insertParagraph({ text: 'x', position: -1 })).toThrow();
        });
    });

    describe('insertImage', () => {
        it('copies the file and inserts an Image', () => {
            const src = writeImage('cat.png', 'meow');
            controller.insertImage({ position: 0, width: 100, height: 200, path: src });

            expect(controller.getItemsCount()).toBe(1);
            const img = controller.getItems()[0] as Image;
            expect(img.width).toBe(100);
            expect(img.height).toBe(200);
            expect(img.path.endsWith('.png')).toBe(true);
        });

        it('generates a hash-based name, not the original', () => {
            const src = writeImage('cat.png', 'meow');
            controller.insertImage({ position: 0, width: 10, height: 10, path: src });

            const img = controller.getItems()[0] as Image;
            expect(img.path).not.toBe('cat.png');
            expect(img.path).not.toContain('cat');
        });

        it('throws when the source file does not exist', () => {
            expect(() =>
                controller.insertImage({ position: 0, width: 10, height: 10, path: 'missing.png' }),
            ).toThrow(/not found/);
        });

        it('does not modify the document when source is missing', () => {
            try {
                controller.insertImage({ position: 0, width: 10, height: 10, path: 'missing.png' });
            } catch { /* ignore */ }
            expect(controller.getItemsCount()).toBe(0);
        });
    });

    describe('setTitle', () => {
        it('changes the title', () => {
            controller.setTitle({ title: 'New' });
            expect(controller.getTitle()).toBe('New');
        });

        it('accepts empty string', () => {
            controller.setTitle({ title: '' });
            expect(controller.getTitle()).toBe('');
        });

        it('is undoable', () => {
            controller.setTitle({ title: 'New' });
            controller.undo();
            expect(controller.getTitle()).toBe('New title');
        });
    });

    describe('deleteItem', () => {
        it('removes the item at the given position', () => {
            controller.insertParagraph({ text: 'a', position: 0 });
            controller.insertParagraph({ text: 'b', position: 1 });
            controller.deleteItem({ position: 0 });

            expect(controller.getItemsCount()).toBe(1);
            expect((controller.getItems()[0] as Paragraph).text).toBe('b');
        });

        it('removes the last remaining item', () => {
            controller.insertParagraph({ text: 'a', position: 0 });
            controller.deleteItem({ position: 0 });
            expect(controller.getItemsCount()).toBe(0);
        });

        it('throws on invalid position', () => {
            expect(() => controller.deleteItem({ position: 5 })).toThrow();
        });

        it('throws on empty document', () => {
            expect(() => controller.deleteItem({ position: 0 })).toThrow();
        });
    });

    describe('replaceText', () => {
        it('replaces the text of a paragraph', () => {
            controller.insertParagraph({ text: 'old', position: 0 });
            controller.replaceText({ position: 0, text: 'new' });
            expect((controller.getItems()[0] as Paragraph).text).toBe('new');
        });

        it('throws when the item is not a paragraph', () => {
            const src = writeImage('cat.png');
            controller.insertImage({ position: 0, width: 10, height: 10, path: src });
            expect(() => controller.replaceText({ position: 0, text: 'x' })).toThrow(/no paragraph/);
        });

        it('throws on invalid position', () => {
            expect(() => controller.replaceText({ position: 0, text: 'x' })).toThrow();
        });
    });

    describe('resizeImage', () => {
        it('changes the image dimensions', () => {
            const src = writeImage('cat.png');
            controller.insertImage({ position: 0, width: 100, height: 200, path: src });
            controller.resizeImage({ position: 0, width: 50, height: 75 });

            const img = controller.getItems()[0] as Image;
            expect(img.width).toBe(50);
            expect(img.height).toBe(75);
        });

        it('throws when the item is not an image', () => {
            controller.insertParagraph({ text: 'x', position: 0 });
            expect(() =>
                controller.resizeImage({ position: 0, width: 10, height: 10 }),
            ).toThrow(/no image/);
        });

        it('throws on invalid position', () => {
            expect(() =>
                controller.resizeImage({ position: 0, width: 10, height: 10 }),
            ).toThrow();
        });
    });

    describe('undo / redo — basic', () => {
        it('undoes the last inserted paragraph', () => {
            controller.insertParagraph({ text: 'a', position: 0 });
            controller.undo();
            expect(controller.getItemsCount()).toBe(0);
        });

        it('redoes the last undone command', () => {
            controller.insertParagraph({ text: 'a', position: 0 });
            controller.undo();
            controller.redo();
            expect(controller.getItemsCount()).toBe(1);
        });

        it('throws on undo with empty history', () => {
            expect(() => controller.undo()).toThrow(/Nothing to undo/);
        });

        it('throws on redo with empty redo-branch', () => {
            expect(() => controller.redo()).toThrow(/Nothing to redo/);
        });

        it('undoes a title change', () => {
            controller.setTitle({ title: 'new' });
            controller.undo();
            expect(controller.getTitle()).toBe('New title');
        });

        it('undoes a delete', () => {
            controller.insertParagraph({ text: 'a', position: 0 });
            controller.deleteItem({ position: 0 });
            controller.undo();
            expect(controller.getItemsCount()).toBe(1);
        });
    });

    describe('merge behaviour through the full stack', () => {
        it('consecutive SetTitle merges into one undoable action', () => {
            controller.setTitle({ title: 'A' });
            controller.setTitle({ title: 'B' });
            controller.setTitle({ title: 'C' });

            controller.undo();

            expect(controller.getTitle()).toBe('New title');
        });

        it('consecutive SetTitle redo restores the last title', () => {
            controller.setTitle({ title: 'A' });
            controller.setTitle({ title: 'B' });
            controller.undo();
            controller.redo();
            expect(controller.getTitle()).toBe('B');
        });

        it('consecutive ReplaceText on the same paragraph merges into one action', () => {
            controller.insertParagraph({ text: 'original', position: 0 });
            controller.replaceText({ position: 0, text: 'A' });
            controller.replaceText({ position: 0, text: 'B' });
            controller.replaceText({ position: 0, text: 'C' });

            controller.undo();

            expect((controller.getItems()[0] as Paragraph).text).toBe('original');
        });

        it('a non-mergeable action breaks the merge chain', () => {
            controller.setTitle({ title: 'A' });
            controller.insertParagraph({ text: 'x', position: 0 });
            controller.setTitle({ title: 'B' });

            controller.undo();
            expect(controller.getTitle()).toBe('A');

            controller.undo();
            expect(controller.getItemsCount()).toBe(0);

            controller.undo();
            expect(controller.getTitle()).toBe('New title');
        });

        it('consecutive ResizeImage on the same image merges into one action', () => {
            const src = writeImage('cat.png');
            controller.insertImage({ position: 0, width: 100, height: 100, path: src });
            controller.resizeImage({ position: 0, width: 50, height: 50 });
            controller.resizeImage({ position: 0, width: 25, height: 25 });

            controller.undo();

            const img = controller.getItems()[0] as Image;
            expect(img.width).toBe(100);
            expect(img.height).toBe(100);
        });

        it('ReplaceText on a different paragraph does not merge', () => {
            controller.insertParagraph({ text: 'p1', position: 0 });
            controller.insertParagraph({ text: 'p2', position: 1 });
            controller.replaceText({ position: 0, text: 'X' });
            controller.replaceText({ position: 1, text: 'Y' });

            controller.undo();

            const items = controller.getItems() as Paragraph[];
            expect(items[0].text).toBe('X');
            expect(items[1].text).toBe('p2');
        });
    });

    describe('new action clears redo branch', () => {
        it('insert → undo → insert different makes redo unavailable', () => {
            controller.insertParagraph({ text: 'a', position: 0 });
            controller.undo();
            controller.insertParagraph({ text: 'b', position: 0 });

            expect(() => controller.redo()).toThrow(/Nothing to redo/);
        });

        it('insert → undo → setTitle makes redo unavailable', () => {
            controller.insertParagraph({ text: 'a', position: 0 });
            controller.undo();
            controller.setTitle({ title: 'new' });

            expect(() => controller.redo()).toThrow(/Nothing to redo/);
        });
    });

    describe('save', () => {
        it('writes an HTML file at the given path', () => {
            controller.insertParagraph({ text: 'hello', position: 0 });
            const out = path.join(tmpDir, 'out.html');
            controller.save(out);

            expect(fs.existsSync(out)).toBe(true);
            expect(fs.readFileSync(out, 'utf-8')).toContain('<p>hello</p>');
        });

        it('writes the title into <title>', () => {
            controller.setTitle({ title: 'My doc' });
            const out = path.join(tmpDir, 'out.html');
            controller.save(out);

            expect(fs.readFileSync(out, 'utf-8')).toContain('<title>My doc</title>');
        });

        it('includes the standard HTML boilerplate', () => {
            const out = path.join(tmpDir, 'out.html');
            controller.save(out);
            const html = fs.readFileSync(out, 'utf-8');

            expect(html).toContain('<!DOCTYPE html>');
            expect(html).toContain('<html>');
            expect(html).toContain('<head>');
            expect(html).toContain('<body>');
            expect(html).toContain('</html>');
        });

        it('escapes HTML in the title', () => {
            controller.setTitle({ title: '<b>&"x"</b>' });
            const out = path.join(tmpDir, 'out.html');
            controller.save(out);

            const html = fs.readFileSync(out, 'utf-8');
            expect(html).toContain('&lt;b&gt;&amp;&quot;x&quot;&lt;/b&gt;');
        });

        it('escapes HTML in paragraph text', () => {
            controller.insertParagraph({ text: '<script>x</script>', position: 0 });
            const out = path.join(tmpDir, 'out.html');
            controller.save(out);

            expect(fs.readFileSync(out, 'utf-8')).toContain('&lt;script&gt;');
        });

        it('copies images into <html-dir>/images', () => {
            const src = writeImage('cat.png', 'meow');
            controller.insertImage({ position: 0, width: 10, height: 10, path: src });

            const out = path.join(tmpDir, 'out.html');
            controller.save(out);

            const imagesDir = path.join(tmpDir, 'images');
            expect(fs.existsSync(imagesDir)).toBe(true);
            const files = fs.readdirSync(imagesDir);
            expect(files.length).toBe(1);
            expect(files[0].endsWith('.png')).toBe(true);
        });

        it('uses relative paths for images in the HTML', () => {
            const src = writeImage('cat.png');
            controller.insertImage({ position: 0, width: 10, height: 10, path: src });

            const out = path.join(tmpDir, 'out.html');
            controller.save(out);

            const html = fs.readFileSync(out, 'utf-8');
            expect(html).toContain('src="images/');
            expect(html).not.toContain(tmpDir.replace(/\\/g, '/'));
        });

        it('saves an empty document without errors', () => {
            const out = path.join(tmpDir, 'empty.html');
            expect(() => controller.save(out)).not.toThrow();
            expect(fs.existsSync(out)).toBe(true);
        });

        it('overwrites an existing file', () => {
            const out = path.join(tmpDir, 'out.html');
            fs.writeFileSync(out, 'old content');

            controller.insertParagraph({ text: 'new', position: 0 });
            controller.save(out);

            expect(fs.readFileSync(out, 'utf-8')).not.toContain('old content');
        });
    });

    describe('complex scenarios', () => {
        it('insert paragraph + image, undo, redo, save', () => {
            const src = writeImage('cat.png', 'meow');

            controller.insertParagraph({ text: 'hello', position: 0 });
            controller.insertImage({ position: 1, width: 100, height: 200, path: src });

            expect(controller.getItemsCount()).toBe(2);

            controller.undo();
            expect(controller.getItemsCount()).toBe(1);

            controller.redo();
            expect(controller.getItemsCount()).toBe(2);

            const out = path.join(tmpDir, 'out.html');
            controller.save(out);

            const html = fs.readFileSync(out, 'utf-8');
            expect(html).toContain('<p>hello</p>');
            expect(html).toContain('<img');
        });

        it('mixed merge and non-merge: title A, insert, title B, undo ×3', () => {
            controller.setTitle({ title: 'A' });
            controller.insertParagraph({ text: 'x', position: 0 });
            controller.setTitle({ title: 'B' });

            controller.undo();
            expect(controller.getTitle()).toBe('A');

            controller.undo();
            expect(controller.getItemsCount()).toBe(0);

            controller.undo();
            expect(controller.getTitle()).toBe('New title');
        });

        it('delete image, undo, save still works', () => {
            const src = writeImage('cat.png', 'meow');
            controller.insertImage({ position: 0, width: 10, height: 10, path: src });
            controller.deleteItem({ position: 0 });
            controller.undo();

            const out = path.join(tmpDir, 'out.html');
            expect(() => controller.save(out)).not.toThrow();

            const imagesDir = path.join(tmpDir, 'images');
            expect(fs.readdirSync(imagesDir).length).toBe(1);
        });
    });
});