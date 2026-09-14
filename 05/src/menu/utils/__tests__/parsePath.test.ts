import { parsePath } from '../parsePath';

describe('parsePath', () => {
    describe('valid inputs', () => {
        it('returns a simple file name', () => {
            expect(parsePath('cat.png')).toBe('cat.png');
        });

        it('returns a nested relative path', () => {
            expect(parsePath('assets/img/cat.png')).toBe('assets/img/cat.png');
        });

        it('preserves a Unix absolute path', () => {
            expect(parsePath('/home/user/cat.png')).toBe('/home/user/cat.png');
        });

        it('preserves a Windows path', () => {
            expect(parsePath('C:\\images\\cat.png')).toBe('C:\\images\\cat.png');
        });

        it('preserves internal spaces', () => {
            expect(parsePath('my cat.png')).toBe('my cat.png');
        });

        it('preserves a file name without extension', () => {
            expect(parsePath('README')).toBe('README');
        });

        it('preserves a path with multiple dots', () => {
            expect(parsePath('archive.tar.gz')).toBe('archive.tar.gz');
        });

        it('trims surrounding whitespace', () => {
            expect(parsePath('   cat.png   ')).toBe('cat.png');
        });

        it('trims tabs around the path', () => {
            expect(parsePath('\tcat.png\t')).toBe('cat.png');
        });
    });

    describe('invalid inputs', () => {
        it('rejects empty string', () => {
            expect(() => parsePath('')).toThrow(/cannot be empty/);
        });

        it('rejects whitespace-only string', () => {
            expect(() => parsePath('    ')).toThrow(/cannot be empty/);
        });

        it('rejects tab-only string', () => {
            expect(() => parsePath('\t')).toThrow(/cannot be empty/);
        });

        it('rejects newline-only string', () => {
            expect(() => parsePath('\n')).toThrow(/cannot be empty/);
        });
    });
});