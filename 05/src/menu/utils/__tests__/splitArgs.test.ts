import { splitArgs } from '../splitArgs';

describe('splitArgs', () => {
    describe('basic splitting', () => {
        it('splits on single spaces', () => {
            expect(splitArgs('a b c', 3)).toEqual(['a', 'b', 'c']);
        });

        it('collapses multiple spaces', () => {
            expect(splitArgs('a    b   c', 3)).toEqual(['a', 'b', 'c']);
        });

        it('trims leading and trailing whitespace', () => {
            expect(splitArgs('   a b   ', 2)).toEqual(['a', 'b']);
        });

        it('handles tabs and newlines as separators', () => {
            expect(splitArgs('a\tb\nc', 3)).toEqual(['a', 'b', 'c']);
        });

        it('returns a single-element array for a single token', () => {
            expect(splitArgs('hello', 1)).toEqual(['hello']);
        });

        it('preserves special characters inside tokens', () => {
            expect(splitArgs('foo=bar baz', 2)).toEqual(['foo=bar', 'baz']);
        });
    });

    describe('minimum-arguments check', () => {
        it('throws when fewer tokens than minimum', () => {
            expect(() => splitArgs('a', 2)).toThrow(/at least 2/);
        });

        it('throws on empty string when min >= 1', () => {
            expect(() => splitArgs('', 1)).toThrow(/at least 1/);
        });

        it('throws on whitespace-only string when min >= 1', () => {
            expect(() => splitArgs('   ', 1)).toThrow(/at least 1/);
        });

        it('reports the actual token count in the error message', () => {
            expect(() => splitArgs('a', 5)).toThrow(/got 1/);
        });

        it('accepts min = 0 on empty input', () => {
            expect(splitArgs('', 0)).toEqual([]);
        });

        it('accepts min = 0 on whitespace-only input', () => {
            expect(splitArgs('   ', 0)).toEqual([]);
        });
    });

    describe('known limitation: quoted strings are not honored', () => {
        it('does not treat double-quoted text as a single token', () => {
            expect(splitArgs('"a b" c', 2)).toEqual(['"a', 'b"', 'c']);
        });

        it('does not treat single-quoted text as a single token', () => {
            expect(splitArgs("'a b' c", 2)).toEqual(["'a", "b'", 'c']);
        });
    });
});