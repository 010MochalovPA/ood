import { escapeHtml } from '../../menu/utils/escapeHtml';
import { FileStorage } from '../../storage/FileStorage';
import { DocumentItemType } from '../../types';
import { BaseDocumentItem } from './BaseDocumentItem';

class Paragraph extends BaseDocumentItem {
    protected readonly _type: DocumentItemType = 'paragraph';
    private _text: string;

    constructor(text: string) {
        super();

        this._text = text;
    }

    get text(): string {
        return this._text;
    }

    set text(text: string) {
        this._text = text;
    }

    render(): string {
        return `<p>${escapeHtml(this._text)}</p>`;
    }

    toString(): string {
        return `[Paragraph] ${this._text}`;
    }

    acquireResource(storage: FileStorage): void { }
    releaseResource(storage: FileStorage): void { }
}

export {
    Paragraph,
}