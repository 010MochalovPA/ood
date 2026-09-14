import { parseImageSize } from '../parseImageSize';

describe('parseImageSize', () => {
    describe('boundary values (1 .. 10000 inclusive)', () => {
        it('accepts 1 (lower bound)', () => {
            expect(parseImageSize('1')).toBe(1);
        });

        it('accepts 2 (just above lower bound)', () => {
            expect(parseImageSize('2')).toBe(2);
        });

        it('accepts 9999 (just below upper bound)', () => {
            expect(parseImageSize('9999')).toBe(9999);
        });

        it('accepts 10000 (upper bound)', () => {
            expect(parseImageSize('10000')).toBe(10000);
        });

        it('rejects 0 (one below lower bound)', () => {
            expect(() => parseImageSize('0')).toThrow(/between 1 and 10000/);
        });

        it('rejects 10001 (one above upper bound)', () => {
            expect(() => parseImageSize('10001')).toThrow(/between 1 and 10000/);
        });
    });

    describe('valid mid-range values', () => {
        it('accepts 500', () => {
            expect(parseImageSize('500')).toBe(500);
        });

        it('accepts leading zeros', () => {
            expect(parseImageSize('007')).toBe(7);
        });
    });

    describe('out-of-range inputs', () => {
        it('rejects negative values', () => {
            expect(() => parseImageSize('-1')).toThrow(/between 1 and 10000/);
        });

        it('rejects large negative values', () => {
            expect(() => parseImageSize('-99999')).toThrow(/between 1 and 10000/);
        });

        it('rejects values far above maximum', () => {
            expect(() => parseImageSize('999999')).toThrow(/between 1 and 10000/);
        });
    });

    describe('invalid formats', () => {
        it('rejects non-integer numbers', () => {
            expect(() => parseImageSize('1.5')).toThrow(/integer/);
        });

        it('rejects non-numeric strings', () => {
            expect(() => parseImageSize('abc')).toThrow();
        });

        it('rejects empty string', () => {
            expect(() => parseImageSize('')).toThrow();
        });

        it('rejects whitespace-only string', () => {
            expect(() => parseImageSize('   ')).toThrow();
        });

        it('rejects Infinity', () => {
            expect(() => parseImageSize('Infinity')).toThrow();
        });

        it('rejects NaN literal', () => {
            expect(() => parseImageSize('NaN')).toThrow();
        });
    });
});