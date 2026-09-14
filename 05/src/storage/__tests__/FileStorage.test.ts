import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { FileStorage } from '../FileStorage';
import { RESOURCES_DIR, WORKING_RESOURCES_DIR } from '../constants';

describe('FileStorage', () => {
    let tmpDir: string;
    let storage: FileStorage;

    beforeEach(() => {
        tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'file-storage-test-'));
        storage = new FileStorage(tmpDir);
    });

    afterEach(() => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
    });

    const workingDir = (): string => path.join(tmpDir, WORKING_RESOURCES_DIR);

    const writeSource = (name: string, content = 'hello'): string => {
        const p = path.join(tmpDir, name);
        fs.writeFileSync(p, content);
        return p;
    };

    describe('constructor', () => {
        it('creates the working directory', () => {
            expect(fs.existsSync(workingDir())).toBe(true);
        });

        it('is idempotent — constructing twice does not throw', () => {
            expect(() => new FileStorage(tmpDir)).not.toThrow();
        });
    });

    describe('copy', () => {
        it('copies an absolute source into the working dir', () => {
            const src = writeSource('cat.png', 'meow');
            const fileName = storage.copy(src);

            expect(fileName.endsWith('.png')).toBe(true);
            expect(fs.existsSync(path.join(workingDir(), fileName))).toBe(true);
            expect(fs.readFileSync(path.join(workingDir(), fileName), 'utf-8')).toBe('meow');
        });

        it('resolves relative source paths against the document dir', () => {
            writeSource('cat.png', 'meow');
            const fileName = storage.copy('cat.png');
            expect(fs.existsSync(path.join(workingDir(), fileName))).toBe(true);
        });

        it('generates different names for different content', () => {
            const a = writeSource('a.png', 'AAA');
            const b = writeSource('b.png', 'BBB');
            expect(storage.copy(a)).not.toBe(storage.copy(b));
        });

        it('generates the same name for identical content', () => {
            const a = writeSource('a.png', 'SAME');
            const b = writeSource('b.png', 'SAME');
            expect(storage.copy(a)).toBe(storage.copy(b));
        });

        it('preserves the source file extension', () => {
            const src = writeSource('image.jpg', 'jpg-bytes');
            expect(storage.copy(src).endsWith('.jpg')).toBe(true);
        });

        it('handles files without extension', () => {
            const src = writeSource('README', 'readme');
            expect(storage.copy(src)).not.toContain('.');
        });

        it('throws when the source does not exist', () => {
            expect(() => storage.copy('missing.png')).toThrow(/not found/);
        });

        it('is idempotent for the same source (no re-copy)', () => {
            const src = writeSource('cat.png', 'meow');
            const first = storage.copy(src);
            const mtimeBefore = fs.statSync(path.join(workingDir(), first)).mtimeMs;

            const start = Date.now();
            while (Date.now() - start < 15) { /* spin */ }

            const second = storage.copy(src);
            expect(second).toBe(first);
            expect(fs.statSync(path.join(workingDir(), second)).mtimeMs).toBe(mtimeBefore);
        });
    });

    describe('acquire / release', () => {
        it('acquire does not remove the file', () => {
            const name = storage.copy(writeSource('cat.png', 'meow'));
            storage.acquire(name);
            expect(fs.existsSync(path.join(workingDir(), name))).toBe(true);
        });

        it('release on an unreferenced file physically deletes it', () => {
            const name = storage.copy(writeSource('cat.png', 'meow'));
            storage.release(name);
            expect(fs.existsSync(path.join(workingDir(), name))).toBe(false);
        });

        it('file survives while refcount > 0', () => {
            const name = storage.copy(writeSource('cat.png', 'meow'));
            storage.acquire(name);
            storage.acquire(name);
            storage.release(name);
            expect(fs.existsSync(path.join(workingDir(), name))).toBe(true);
        });

        it('file is removed after balanced acquires and releases', () => {
            const name = storage.copy(writeSource('cat.png', 'meow'));
            storage.acquire(name);
            storage.acquire(name);
            storage.release(name);
            storage.release(name);
            expect(fs.existsSync(path.join(workingDir(), name))).toBe(false);
        });

        it('release on a missing file does not throw', () => {
            expect(() => storage.release('nonexistent.png')).not.toThrow();
        });

        it('extra releases beyond zero do not throw', () => {
            const name = storage.copy(writeSource('cat.png', 'meow'));
            storage.release(name);
            expect(() => storage.release(name)).not.toThrow();
        });
    });

    describe('copyResourcesTo', () => {
        it('copies listed resources into <html-dir>/images', () => {
            const name = storage.copy(writeSource('cat.png', 'meow'));

            const targetDir = path.join(tmpDir, 'out');
            fs.mkdirSync(targetDir);
            const htmlPath = path.join(targetDir, 'doc.html');

            storage.copyResourcesTo(htmlPath, [name]);

            const expected = path.join(targetDir, RESOURCES_DIR, name);
            expect(fs.existsSync(expected)).toBe(true);
            expect(fs.readFileSync(expected, 'utf-8')).toBe('meow');
        });

        it('creates the images directory if missing', () => {
            const name = storage.copy(writeSource('cat.png', 'meow'));
            const targetDir = path.join(tmpDir, 'nested', 'out');
            const htmlPath = path.join(targetDir, 'doc.html');

            storage.copyResourcesTo(htmlPath, [name]);
            expect(fs.existsSync(path.join(targetDir, RESOURCES_DIR))).toBe(true);
        });

        it('deduplicates repeated file names', () => {
            const name = storage.copy(writeSource('cat.png', 'meow'));
            const targetDir = path.join(tmpDir, 'out');
            fs.mkdirSync(targetDir);
            const htmlPath = path.join(targetDir, 'doc.html');

            expect(() => storage.copyResourcesTo(htmlPath, [name, name, name])).not.toThrow();
            expect(fs.existsSync(path.join(targetDir, RESOURCES_DIR, name))).toBe(true);
        });

        it('silently skips resources that no longer exist', () => {
            const targetDir = path.join(tmpDir, 'out');
            fs.mkdirSync(targetDir);
            const htmlPath = path.join(targetDir, 'doc.html');

            expect(() => storage.copyResourcesTo(htmlPath, ['ghost.png'])).not.toThrow();
        });

        it('does nothing on empty list', () => {
            const targetDir = path.join(tmpDir, 'out');
            fs.mkdirSync(targetDir);
            const htmlPath = path.join(targetDir, 'doc.html');

            storage.copyResourcesTo(htmlPath, []);
            expect(fs.existsSync(path.join(targetDir, RESOURCES_DIR))).toBe(true);
        });
    });

    describe('clear', () => {
        it('removes the working directory', () => {
            storage.clear();
            expect(fs.existsSync(workingDir())).toBe(false);
        });

        it('is idempotent', () => {
            storage.clear();
            expect(() => storage.clear()).not.toThrow();
        });
    });
});