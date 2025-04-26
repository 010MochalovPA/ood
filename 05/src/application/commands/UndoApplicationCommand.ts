import { DocumentController } from "../../document/DocumentController";
import { Command } from "../../command/Command";

class UndoApplicationCommand extends Command {
    private _documentController: DocumentController;

    constructor(documentController: DocumentController) {
        super();

        this._documentController = documentController;
    }

    doExecute(): void {
        this._documentController.undo();
    }
}

export {
    UndoApplicationCommand,
}