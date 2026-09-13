import { DocumentController } from "../../document/DocumentController";
import { parsePath } from "../utils/parsePath";
import { MenuCommand } from "./MenuCommand";

class SaveMenuCommand extends MenuCommand {
    private _documentController: DocumentController;

    constructor(documentController: DocumentController) {
        super(
            'Save',
            'Save the document to an HTML file',
            'Save <path>',
        );
        this._documentController = documentController;
    }

    doExecute(args: string): void {
        const path = parsePath(args);

        this._documentController.save(path);
    }
}

export {
    SaveMenuCommand,
};