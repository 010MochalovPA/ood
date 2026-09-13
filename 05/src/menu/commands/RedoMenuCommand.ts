import { DocumentController } from "../../document/DocumentController";
import { MenuCommand } from "./MenuCommand";

class RedoMenuCommand extends MenuCommand {
    constructor(private _documentController: DocumentController) {
        super(
            'Redo',
            'Выполняет ранее отмененную команду редактирования',
            'Redo',
        );
    }

    doExecute(): void {
        this._documentController.redo();
    }
}

export {
    RedoMenuCommand,
};