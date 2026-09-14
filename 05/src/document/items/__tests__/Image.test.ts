import { Image } from '../Image';
import { FileStorage } from '../../../storage/FileStorage';

const fakeStorage = {
    acquire: jest.fn(),
    release: jest.fn(),
} as unknown as FileStorage;

describe('Image', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('construction and accessors', () => {
        it('stores path, width and height', () => {
            const img = new Image('cat.png', 100, 200);
            expect(img.path).toBe('cat.png');
            expect(img.width).toBe(100);
            expect(img.height).toBe(200);
        });

        it('exposes type as "image"', () => {
            const img = new Image('cat.png', 1, 1);
            expect(img.type).toBe('image');
        });
    });

    describe('resize', () => {
        it('updates width and height', () => {
            const img = new Image('cat.png', 100, 200);
            img.resize(50, 75);
            expect(img.width).toBe(50);
            expect(img.height).toBe(75);
        });

        it('does not modify path', () => {
            const img = new Image('cat.png', 100, 200);
            img.resize(50, 75);
            expect(img.path).toBe('cat.png');
        });

        it('can be resized multiple times', () => {
            const img = new Image('cat.png', 100, 200);
            img.resize(50, 75);
            img.resize(10, 10);
            expect(img.width).toBe(10);
            expect(img.height).toBe(10);
        });
    });

    describe('getResourcePath', () => {
        it('returns the path', () => {
            const img = new Image('cat.png', 1, 1);
            expect(img.getResourcePath()).toBe('cat.png');
        });
    });

    describe('resource methods delegate to storage', () => {
        it('acquireResource calls storage.acquire with the path', () => {
            const img = new Image('cat.png', 1, 1);
            img.acquireResource(fakeStorage);
            expect(fakeStorage.acquire).toHaveBeenCalledTimes(1);
            expect(fakeStorage.acquire).toHaveBeenCalledWith('cat.png');
        });

        it('releaseResource calls storage.release with the path', () => {
            const img = new Image('cat.png', 1, 1);
            img.releaseResource(fakeStorage);
            expect(fakeStorage.release).toHaveBeenCalledTimes(1);
            expect(fakeStorage.release).toHaveBeenCalledWith('cat.png');
        });

        it('acquire then release are balanced calls', () => {
            const img = new Image('cat.png', 1, 1);
            img.acquireResource(fakeStorage);
            img.releaseResource(fakeStorage);
            expect(fakeStorage.acquire).toHaveBeenCalledTimes(1);
            expect(fakeStorage.release).toHaveBeenCalledTimes(1);
        });
    });

    describe('render', () => {
        it('produces <img> with relative src and dimensions', () => {
            const img = new Image('cat.png', 100, 200);
            expect(img.render()).toBe(
                '<img src="images/cat.png" width="100" height="200">'
            );
        });

        it('escapes HTML characters in the path', () => {
            const img = new Image('a&b"c.png', 10, 20);
            expect(img.render()).toBe(
                '<img src="images/a&amp;b&quot;c.png" width="10" height="20">'
            );
        });

        it('reflects current dimensions after resize', () => {
            const img = new Image('cat.png', 100, 200);
            img.resize(50, 75);
            expect(img.render()).toBe(
                '<img src="images/cat.png" width="50" height="75">'
            );
        });
    });

    describe('toString', () => {
        it('returns prefixed size and path (current format)', () => {
            const img = new Image('cat.png', 100, 200);
            expect(img.toString()).toBe('[Image] 100x200 cat.png');
        });
    });
});