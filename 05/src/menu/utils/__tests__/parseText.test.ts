import { parseText } from '../parseText';

describe('parseText', () => {
    describe('valid inputs', () => {
        it('returns a plain string as-is', () => {
            expect(parseText('hello')).toBe('hello');
        });

        it('preserves leading whitespace', () => {
            expect(parseText('  hello')).toBe('  hello');
        });

        it('preserves internal and trailing whitespace', () => {
            expect(parseText('hello  world ')).toBe('hello  world ');
        });

        it('preserves punctuation', () => {
            expect(parseText('Hello, world!')).toBe('Hello, world!');
        });

        it('preserves HTML special characters as-is', () => {
            expect(parseText('<b>&</b>')).toBe('<b>&</b>');
        });

        it('preserves non-ASCII characters', () => {
            expect(parseText('Привет, мир!')).toBe('Привет, мир!');
        });

        it('preserves emoji', () => {
            expect(parseText('hello 👋')).toBe('hello 👋');
        });

        it('preserves a single character', () => {
            expect(parseText('x')).toBe('x');
        });

        it('preserves tabs inside the text', () => {
            expect(parseText('a\tb')).toBe('a\tb');
        });
    });

    describe('invalid inputs', () => {
        it('rejects empty string', () => {
            expect(() => parseText('')).toThrow(/cannot be empty/);
        });

        it('rejects whitespace-only string', () => {
            expect(() => parseText('   ')).toThrow(/cannot be empty/);
        });

        it('rejects tab-only string', () => {
            expect(() => parseText('\t\t')).toThrow(/cannot be empty/);
        });

        it('rejects newline-only string', () => {
            expect(() => parseText('\n\n')).toThrow(/cannot be empty/);
        });
    });
});