import { InsertParagraphDocumentCommand } from "./commands/InsertParagraphDocumentCommand";
import { IDocument } from "./IDocument";
import { History } from "../history/History";
import { SetTitleDocumentCommand } from "./commands/SetTitleDocumentCommand";
import { DocumentItemList } from "../types";

type DocumentControllerParams = {
    history: History,
    document: IDocument,
}

class DocumentController {
    private _history: History;
    private _document: IDocument;

    constructor({
        history,
        document,
    }: DocumentControllerParams) {
        this._history = history;
        this._document = document;
    }

    insertParagraph(text: string): void {
        const parts = text.split(' ');
        const lastPart = parts[parts.length - 1];
        const isLastPartNumber = !isNaN(Number(lastPart));

        let parsedText = text;
        let position = undefined;

        if (isLastPartNumber && parts.length > 1) {
            parsedText = parts.slice(0, -1).join(' ');
            position = Number(lastPart);
        }

        const command = new InsertParagraphDocumentCommand(this._document, parsedText.trim(), position);
        this._history.addAndExecuteCommand(command);
    }

    insertImage(path: string, position?: number): void {
        // TODO
    }

    setTitle(title: string): void {
        const command = new SetTitleDocumentCommand(this._document, title);
        this._history.addAndExecuteCommand(command);
    }

    getTitle(): string {
        return this._document.getTitle();
    }

    getItems(): DocumentItemList {
        return this._document.getItems();
    }

    undo(): void {
        if (this._history.canUndo()) {
            this._history.undo();
            return;
        }

        console.log('Невозможно отменить комманду!');
    }

    redo(): void {
        if (this._history.canRedo()) {
            this._history.redo();
            return;
        }

        console.log('Невозможно отменить комманду!');
    }
}

export {
    DocumentController,
}