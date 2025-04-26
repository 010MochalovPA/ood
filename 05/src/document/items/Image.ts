import { DocumentItemType } from '../../types';
import { AbstractDocumentItem } from './AbstractDocumentItem';

class Image extends AbstractDocumentItem {
    protected readonly _type: DocumentItemType = DocumentItemType.IMAGE;

    constructor() {
        super();
    }

    render(): string {
        return 'image'; // TODO
    }

    toString(): string {
        return 'image'; // TODO
    }
}

export {
    Image,
}