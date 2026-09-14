import { ResizeImageDocumentCommand } from '../ResizeImageDocumentCommand';
import { Image } from '../../items/Image';

describe('ResizeImageDocumentCommand', () => {
    describe('execute / unexecute', () => {
        it('applies the new size on execute', () => {
            const img = new Image('cat.png', 100, 200);
            const cmd = new ResizeImageDocumentCommand(img, 50, 75);
            cmd.execute();
            expect(img.width).toBe(50);
            expect(img.height).toBe(75);
        });

        it('restores the previous size on unexecute', () => {
            const img = new Image('cat.png', 100, 200);
            const cmd = new ResizeImageDocumentCommand(img, 50, 75);
            cmd.execute();
            cmd.unexecute();
            expect(img.width).toBe(100);
            expect(img.height).toBe(200);
        });

        it('captures old size at construction, not at execute', () => {
            const img = new Image('cat.png', 100, 200);
            const cmd = new ResizeImageDocumentCommand(img, 50, 75);
            img.resize(999, 999);
            cmd.execute();
            cmd.unexecute();
            expect(img.width).toBe(100);
            expect(img.height).toBe(200);
        });

        it('is idempotent on repeated execute', () => {
            const img = new Image('cat.png', 100, 200);
            const cmd = new ResizeImageDocumentCommand(img, 50, 75);
            cmd.execute();
            cmd.execute();
            expect(img.width).toBe(50);
        });

        it('is idempotent on repeated unexecute', () => {
            const img = new Image('cat.png', 100, 200);
            const cmd = new ResizeImageDocumentCommand(img, 50, 75);
            cmd.execute();
            cmd.unexecute();
            cmd.unexecute();
            expect(img.width).toBe(100);
        });
    });

    describe('getImage', () => {
        it('returns the target image', () => {
            const img = new Image('cat.png', 1, 1);
            const cmd = new ResizeImageDocumentCommand(img, 2, 2);
            expect(cmd.getImage()).toBe(img);
        });
    });

    describe('tryMerge', () => {
        it('merges with another ResizeImage command on the same image', () => {
            const img = new Image('cat.png', 100, 100);
            const a = new ResizeImageDocumentCommand(img, 50, 50);
            const b = new ResizeImageDocumentCommand(img, 25, 25);
            expect(a.tryMerge(b)).toBe(true);
        });

        it('does not merge when targeting a different image', () => {
            const img1 = new Image('a.png', 100, 100);
            const img2 = new Image('b.png', 100, 100);
            const a = new ResizeImageDocumentCommand(img1, 50, 50);
            const b = new ResizeImageDocumentCommand(img2, 25, 25);
            expect(a.tryMerge(b)).toBe(false);
        });

        it('does not merge with a command of a different class', () => {
            const img = new Image('cat.png', 100, 100);
            const a = new ResizeImageDocumentCommand(img, 50, 50);
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
        it('applying the head applies all chained resizes', () => {
            const img = new Image('cat.png', 100, 100);
            const a = new ResizeImageDocumentCommand(img, 50, 50);
            const b = new ResizeImageDocumentCommand(img, 25, 25);
            const c = new ResizeImageDocumentCommand(img, 10, 10);
            a.tryMerge(b);
            a.tryMerge(c);

            a.execute();
            b.execute();
            c.execute();

            expect(img.width).toBe(10);
            expect(img.height).toBe(10);
        });

        it('undoing the head reverts the whole chain', () => {
            const img = new Image('cat.png', 100, 100);
            const a = new ResizeImageDocumentCommand(img, 50, 50);
            const b = new ResizeImageDocumentCommand(img, 25, 25);
            a.tryMerge(b);

            a.execute();
            b.execute();
            a.unexecute();
            b.unexecute();

            expect(img.width).toBe(100);
            expect(img.height).toBe(100);
        });

        it('redoing the head re-applies the whole chain', () => {
            const img = new Image('cat.png', 100, 100);
            const a = new ResizeImageDocumentCommand(img, 50, 50);
            const b = new ResizeImageDocumentCommand(img, 25, 25);
            a.tryMerge(b);

            a.execute();
            b.execute();
            a.unexecute();
            b.unexecute();
            a.execute();
            b.execute();

            expect(img.width).toBe(25);
            expect(img.height).toBe(25);
        });
    });
});