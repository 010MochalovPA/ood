import { IDocument } from "../IDocument";
import { UnexecutableCommand } from "../../command/UnexecutableCommand";
import { Image } from "../items/Image";
import { FileStorage } from "../../storage/FileStorage";

class InsertImageDocumentCommand extends UnexecutableCommand {
    private _document: IDocument;
    private _image: Image;
    private _position: number;
    private _storage: FileStorage;

    constructor(
        document: IDocument,
        image: Image,
        position: number,
        storage: FileStorage,
    ) {
        super();
        this._document = document;
        this._image = image;
        this._position = position;
        this._storage = storage;

        this._image.acquireResource(storage);
    }

    protected doExecute(): void {
        this._document.insertItem(this._position, this._image);
        this._image.acquireResource(this._storage);
    }

    protected doUnexecute(): void {
        this._document.deleteItem(this._position);
        this._image.releaseResource(this._storage);
    }

    discard(): void {
        this._image.releaseResource(this._storage);
    }
}

export {
    InsertImageDocumentCommand,
};