import { DocumentController } from "../../document/DocumentController";
import { MenuCommand } from "./MenuCommand";

class UndoMenuCommand extends MenuCommand {
    constructor(private _documentController: DocumentController) {
        super(
            'Undo',
            'Отменяет последнюю команду редактирования',
            'Undo',
        );
    }

    doExecute(): void {
        this._documentController.undo();
    }
}

export {
    UndoMenuCommand,
};