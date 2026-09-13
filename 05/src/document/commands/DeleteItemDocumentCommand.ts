import { IDocument } from "../IDocument";
import { UnexecutableCommand } from "../../command/UnexecutableCommand";
import { FileStorage } from "../../storage/FileStorage";
import { DocumentItem } from "../../types";

class DeleteItemDocumentCommand extends UnexecutableCommand {
    private _document: IDocument;
    private _position: number;
    private _item: DocumentItem;
    private _storage: FileStorage;

    constructor(
        document: IDocument,
        position: number,
        item: DocumentItem,
        storage: FileStorage,
    ) {
        super();
        this._document = document;
        this._position = position;
        this._item = item;
        this._storage = storage;

        this._item.acquireResource(storage);
    }

    protected doExecute(): void {
        this._document.deleteItem(this._position);
        this._item.releaseResource(this._storage);
    }

    protected doUnexecute(): void {
        this._document.insertItem(this._position, this._item);
        this._item.acquireResource(this._storage);
    }

    discard(): void {
        this._item.releaseResource(this._storage);
    }
}

export {
    DeleteItemDocumentCommand,
};