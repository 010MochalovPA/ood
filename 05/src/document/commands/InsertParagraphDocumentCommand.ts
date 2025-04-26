import { IDocument } from "../IDocument";
import { UnexecutableCommand } from "../../command/UnexecutableCommand";
import { ICommand } from "../../command/ICommand";

class InsertParagraphDocumentCommand extends UnexecutableCommand {
    private _document: IDocument;
    private _text: string;
    private _position?: number;
    
    constructor(document: IDocument, text: string, position?: number) {
        super();

        this._document = document;
        this._text = text;
        this._position = position;
    }
    
    doExecute(): void {
        this._document.insertParagraph(this._text, this._position);
    }

    doUnexecute(): void {
        this._document.deleteItem(this._position);
    }

    compoundWith(command: ICommand): boolean {
        return false;
    }
}

export {
    InsertParagraphDocumentCommand,
}