import { FileStorage } from "../../storage/FileStorage";
import { DocumentItemType } from "../../types"

abstract class BaseDocumentItem {
    protected abstract readonly _type: DocumentItemType;

    get type(): DocumentItemType {
        return this._type;
    }

    getResourcePath(): string | null {
        return null;
    }

    abstract acquireResource(storage: FileStorage): void
    abstract releaseResource(storage: FileStorage): void
    abstract render(): string
    abstract toString(): string
}

export {
    BaseDocumentItem,
}