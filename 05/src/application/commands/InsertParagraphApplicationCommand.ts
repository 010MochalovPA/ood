import { DocumentController } from "../../document/DocumentController";
import { Command } from "../../command/Command";

class InsertParagraphApplicationCommand extends Command {
    private _documentController: DocumentController;
    
    private _text: string;
    private _position?: number;

    constructor(documentController: DocumentController, text: string, position?: number) {
        super();

        this._documentController = documentController;
        this._text = text;
        this._position = position;
    }
    
    doExecute(): void {
        this._documentController.insertParagraph(this._text, this._position);
    }
}

export {
    InsertParagraphApplicationCommand,
}