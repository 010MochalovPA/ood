import { parsePosition, parsePositionOrEnd } from '../parsePosition';

describe('parsePosition', () => {
    describe('valid inputs (1-based in, 0-based out)', () => {
        it('converts the first position to 0', () => {
            expect(parsePosition('1', 5)).toBe(0);
        });

        it('converts a middle position', () => {
            expect(parsePosition('3', 5)).toBe(2);
        });

        it('converts the last valid position', () => {
            expect(parsePosition('5', 5)).toBe(4);
        });

        it('accepts position 1 with document size 1', () => {
            expect(parsePosition('1', 1)).toBe(0);
        });

        it('accepts position 2 with document size 2', () => {
            expect(parsePosition('2', 2)).toBe(1);
        });
    });

    describe('out-of-range inputs', () => {
        it('rejects zero (below range)', () => {
            expect(() => parsePosition('0', 5)).toThrow(/positive integer/);
        });

        it('rejects zero for a 1-item document', () => {
            expect(() => parsePosition('0', 1)).toThrow(/positive integer/);
        });

        it('rejects negative values', () => {
            expect(() => parsePosition('-1', 5)).toThrow(/positive integer/);
        });

        it('rejects position above max', () => {
            expect(() => parsePosition('6', 5)).toThrow(/out of range/);
        });

        it('rejects position 2 for a 1-item document', () => {
            expect(() => parsePosition('2', 1)).toThrow(/out of range/);
        });

        it('rejects any position for an empty document', () => {
            expect(() => parsePosition('1', 0)).toThrow(/out of range/);
        });
    });

    describe('invalid formats', () => {
        it('rejects non-integer numbers', () => {
            expect(() => parsePosition('1.5', 5)).toThrow(/positive integer/);
        });

        it('rejects non-numeric strings', () => {
            expect(() => parsePosition('abc', 5)).toThrow(/positive integer/);
        });

        it('rejects empty string', () => {
            expect(() => parsePosition('', 5)).toThrow();
        });

        it('rejects whitespace-only string', () => {
            expect(() => parsePosition('   ', 5)).toThrow();
        });

        it('does NOT accept "end" (only parsePositionOrEnd understands it)', () => {
            expect(() => parsePosition('end', 5)).toThrow();
        });
    });
});

describe('parsePositionOrEnd', () => {
    describe('"end" keyword', () => {
        it('returns count for "end"', () => {
            expect(parsePositionOrEnd('end', 5)).toBe(5);
        });

        it('is case-insensitive for "END"', () => {
            expect(parsePositionOrEnd('END', 5)).toBe(5);
        });

        it('is case-insensitive for "End"', () => {
            expect(parsePositionOrEnd('End', 5)).toBe(5);
        });

        it('returns 0 for empty document', () => {
            expect(parsePositionOrEnd('end', 0)).toBe(0);
        });

        it('returns 1 for a 1-item document', () => {
            expect(parsePositionOrEnd('end', 1)).toBe(1);
        });

        it('returns count for a large document', () => {
            expect(parsePositionOrEnd('end', 100)).toBe(100);
        });
    });

    describe('known limitation: "end" is not trimmed', () => {
        it('rejects " end " with surrounding spaces', () => {
            expect(() => parsePositionOrEnd(' end ', 5)).toThrow();
        });

        it('rejects "end " with trailing space', () => {
            expect(() => parsePositionOrEnd('end ', 5)).toThrow();
        });

        it('rejects " end" with leading space', () => {
            expect(() => parsePositionOrEnd(' end', 5)).toThrow();
        });
    });

    describe('numeric input (delegates to parsePosition)', () => {
        it('accepts "1" and returns 0', () => {
            expect(parsePositionOrEnd('1', 5)).toBe(0);
        });

        it('accepts "3" and returns 2', () => {
            expect(parsePositionOrEnd('3', 5)).toBe(2);
        });

        it('accepts the max position', () => {
            expect(parsePositionOrEnd('5', 5)).toBe(4);
        });

        it('rejects "0"', () => {
            expect(() => parsePositionOrEnd('0', 5)).toThrow(/positive integer/);
        });

        it('rejects out-of-range numeric input', () => {
            expect(() => parsePositionOrEnd('6', 5)).toThrow(/out of range/);
        });

        it('rejects numeric input for empty document', () => {
            expect(() => parsePositionOrEnd('1', 0)).toThrow(/out of range/);
        });
    });

    describe('invalid input', () => {
        it('rejects empty string', () => {
            expect(() => parsePositionOrEnd('', 5)).toThrow();
        });

        it('rejects unknown word', () => {
            expect(() => parsePositionOrEnd('start', 5)).toThrow();
        });

        it('rejects "ending" (not an exact match)', () => {
            expect(() => parsePositionOrEnd('ending', 5)).toThrow();
        });
    });
});