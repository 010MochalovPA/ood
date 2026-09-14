import { escapeHtml } from '../escapeHtml';

describe('escapeHtml', () => {
    describe('basic cases', () => {
        it('returns empty string for empty input', () => {
            expect(escapeHtml('')).toBe('');
        });

        it('leaves plain text untouched', () => {
            expect(escapeHtml('Hello, world')).toBe('Hello, world');
        });

        it('leaves digits and punctuation untouched', () => {
            expect(escapeHtml('abc123.,;!?')).toBe('abc123.,;!?');
        });
    });

    describe('each special character', () => {
        it('escapes ampersand', () => {
            expect(escapeHtml('A & B')).toBe('A &amp; B');
        });

        it('escapes angle brackets', () => {
            expect(escapeHtml('<b>bold</b>')).toBe('&lt;b&gt;bold&lt;/b&gt;');
        });

        it('escapes double quotes', () => {
            expect(escapeHtml('say "hi"')).toBe('say &quot;hi&quot;');
        });

        it('escapes single quotes', () => {
            expect(escapeHtml("it's")).toBe('it&#39;s');
        });
    });

    describe('ordering and double-encoding', () => {
        it('escapes ampersand before other characters', () => {
            expect(escapeHtml('&lt;')).toBe('&amp;lt;');
        });

        it('does not decode already-escaped entities', () => {
            expect(escapeHtml('&amp;')).toBe('&amp;amp;');
        });

        it('escapes all five special characters in one string', () => {
            expect(escapeHtml('<a href="x" title=\'y\'>&</a>'))
                .toBe('&lt;a href=&quot;x&quot; title=&#39;y&#39;&gt;&amp;&lt;/a&gt;');
        });
    });

    describe('security-oriented cases', () => {
        it('neutralizes a script tag', () => {
            expect(escapeHtml('<script>alert("xss")</script>'))
                .toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
        });

        it('neutralizes an img onerror payload', () => {
            expect(escapeHtml('<img src=x onerror="hack()">'))
                .toBe('&lt;img src=x onerror=&quot;hack()&quot;&gt;');
        });
    });
});