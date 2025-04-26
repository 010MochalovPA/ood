import { DocumentItemType } from "../../types"

abstract class AbstractDocumentItem {
    protected abstract readonly _type;

    get type(): DocumentItemType {
        return this._type;
    }

    abstract render(): string

    abstract toString(): string
}

export {
    AbstractDocumentItem,
}