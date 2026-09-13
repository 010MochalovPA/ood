import { InsertParagraphDocumentCommand } from "./commands/InsertParagraphDocumentCommand";
import { IDocument } from "./IDocument";
import { History } from "../history/History";
import { SetTitleDocumentCommand } from "./commands/SetTitleDocumentCommand";
import { DocumentItemList } from "../types";
import { DeleteItemArgs, InsertImageArgs, InsertParagraphArgs, ReplaceTextArgs, ResizeImageArgs, SetTitleArgs } from "./types";
import { DeleteItemDocumentCommand } from "./commands/DeleteItemDocumentCommand";
import { ReplaceTextDocumentCommand } from "./commands/ReplaceTextDocumentCommand";
import { Paragraph } from "./items/Paragraph";
import { Image } from "./items/Image";
import { FileStorage } from "../storage/FileStorage";
import { InsertImageDocumentCommand } from "./commands/InsertImageDocumentCommand";
import { ResizeImageDocumentCommand } from "./commands/ResizeImageDocumentCommand";
import { escapeHtml } from "../menu/utils/escapeHtml";
import * as fs from "fs";

type DocumentControllerParams = {
    history: History,
    document: IDocument,
    storage: FileStorage,
}

class DocumentController {
    private _history: History;
    private _document: IDocument;
    private _storage: FileStorage;

    constructor({
        history,
        document,
        storage,
    }: DocumentControllerParams) {
        this._history = history;
        this._document = document;
        this._storage = storage;
    }

    insertParagraph(args: InsertParagraphArgs): void {
        const command = new InsertParagraphDocumentCommand(this._document, args.text, args.position);

        this._history.addAndExecuteCommand(command);
    }

    insertImage(args: InsertImageArgs): void {
        const relativePath = this._storage.copy(args.path);
        const image = new Image(relativePath, args.width, args.height);

        const command = new InsertImageDocumentCommand(
            this._document,
            image,
            args.position,
            this._storage,
        );

        this._history.addAndExecuteCommand(command);
    }

    setTitle(args: SetTitleArgs): void {
        const command = new SetTitleDocumentCommand(this._document, args.title);

        this._history.addAndExecuteCommand(command);
    }

    deleteItem(args: DeleteItemArgs): void {
        const item = this._document.getItem(args.position);

        const command = new DeleteItemDocumentCommand(this._document, args.position, item, this._storage);

        this._history.addAndExecuteCommand(command)
    }

    resizeImage(args: ResizeImageArgs): void {
        const item = this._document.getItem(args.position);

        if (!(item instanceof Image)) {
            throw new Error(`Cannot resize: no image at position ${args.position}`);
        }

        const command = new ResizeImageDocumentCommand(item, args.width, args.height);

        this._history.addAndExecuteCommand(command);
    }

    replaceText(args: ReplaceTextArgs): void {
        const item = this._document.getItem(args.position);

        if (!(item instanceof Paragraph)) {
            throw new Error(`Cannot replace text: no paragraph at position ${args.position}`);
        }

        const command = new ReplaceTextDocumentCommand(item, args.text);

        this._history.addAndExecuteCommand(command);
    }

    getTitle(): string {
        return this._document.getTitle();
    }

    getItems(): DocumentItemList {
        return this._document.getItems();
    }

    getItemsCount(): number {
        return this._document.getItems().length;
    }

    undo(): void {
        if (!this._history.canUndo()) {
            throw new Error('Nothing to undo!');
        }

        this._history.undo();
    }

    redo(): void {
        if (!this._history.canRedo()) {
            throw new Error('Nothing to redo!');
        }

        this._history.redo();
    }

    save(path: string): void {
        const title = escapeHtml(this._document.getTitle());
        const items = this._document.getItems();

        const body = items.map(item => item.render()).join('\n');

        const html = [
            '<!DOCTYPE html>',
            '<html>',
            '<head>',
            '  <meta charset="utf-8">',
            `  <title>${title}</title>`,
            '</head>',
            '<body>',
            body,
            '</body>',
            '</html>',
        ].join('\n');

        fs.writeFileSync(path, html, 'utf-8');

        const resourcePaths = items
            .map(item => item.getResourcePath())
            .filter((p): p is string => p !== null);

        this._storage.copyResourcesTo(path, resourcePaths);
    }

}

export {
    DocumentController,
}