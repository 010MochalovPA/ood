import { IDocument } from "../IDocument";
import { UnexecutableCommand } from "../../command/UnexecutableCommand";
import { Paragraph } from "../items/Paragraph";

class InsertParagraphDocumentCommand extends UnexecutableCommand {
    private _document: IDocument;
    private _text: string;
    private _position: number;

    constructor(document: IDocument, text: string, position: number) {
        super();
        this._document = document;
        this._text = text;
        this._position = position;
    }

    protected doExecute(): void {
        this._document.insertParagraph(new Paragraph(this._text), this._position);
    }

    protected doUnexecute(): void {
        this._document.deleteItem(this._position);
    }
}

export {
    InsertParagraphDocumentCommand,
};