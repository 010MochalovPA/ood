import { DocumentItemType } from '../../types';
import { AbstractDocumentItem } from './AbstractDocumentItem';

class Paragraph extends AbstractDocumentItem {
    protected readonly _type: DocumentItemType = DocumentItemType.PARAGRAPH;
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
        return this._text;
    }

    toString(): string {
        return this._text;
    }
}

export {
    Paragraph,
}