import { DocumentController } from "../../document/DocumentController";
import { Command } from "../../command/Command";

class SetTitleApplicationCommand extends Command {
    private _documentController: DocumentController;
    
    private _title: string;

    constructor(documentController: DocumentController, title: string) {
        super();

        this._documentController = documentController;
        this._title = title;
    }
    
    doExecute(): void {
        this._documentController.setTitle(this._title);
    }
}

export {
    SetTitleApplicationCommand,
}