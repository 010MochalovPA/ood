import { Paragraph } from '../Paragraph';
import { FileStorage } from '../../../storage/FileStorage';

const fakeStorage = {
    acquire: jest.fn(),
    release: jest.fn(),
} as unknown as FileStorage;

describe('Paragraph', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('construction and accessors', () => {
        it('stores the given text', () => {
            const p = new Paragraph('hello');
            expect(p.text).toBe('hello');
        });

        it('accepts empty string at construction (validation — elsewhere)', () => {
            const p = new Paragraph('');
            expect(p.text).toBe('');
        });

        it('exposes type as "paragraph"', () => {
            const p = new Paragraph('x');
            expect(p.type).toBe('paragraph');
        });
    });

    describe('setter', () => {
        it('replaces the text', () => {
            const p = new Paragraph('old');
            p.text = 'new';
            expect(p.text).toBe('new');
        });

        it('accepts empty string', () => {
            const p = new Paragraph('old');
            p.text = '';
            expect(p.text).toBe('');
        });
    });

    describe('render', () => {
        it('wraps text in <p>', () => {
            const p = new Paragraph('hello');
            expect(p.render()).toBe('<p>hello</p>');
        });

        it('escapes HTML special characters', () => {
            const p = new Paragraph('<b>bold</b> & "quoted"');
            expect(p.render()).toBe('<p>&lt;b&gt;bold&lt;/b&gt; &amp; &quot;quoted&quot;</p>');
        });

        it('escapes single quotes', () => {
            const p = new Paragraph("it's");
            expect(p.render()).toBe('<p>it&#39;s</p>');
        });

        it('renders empty paragraph as <p></p>', () => {
            const p = new Paragraph('');
            expect(p.render()).toBe('<p></p>');
        });

        it('preserves non-ASCII characters', () => {
            const p = new Paragraph('Привет 👋');
            expect(p.render()).toBe('<p>Привет 👋</p>');
        });
    });

    describe('toString', () => {
        it('returns prefixed text (current format)', () => {
            const p = new Paragraph('hello');
            expect(p.toString()).toBe('[Paragraph] hello');
        });
    });

    describe('resource methods are no-ops', () => {
        it('acquireResource does not touch storage', () => {
            const p = new Paragraph('x');
            p.acquireResource(fakeStorage);
            expect(fakeStorage.acquire).not.toHaveBeenCalled();
        });

        it('releaseResource does not touch storage', () => {
            const p = new Paragraph('x');
            p.releaseResource(fakeStorage);
            expect(fakeStorage.release).not.toHaveBeenCalled();
        });

        it('getResourcePath returns null', () => {
            const p = new Paragraph('x');
            expect(p.getResourcePath()).toBeNull();
        });
    });
});