import { DocumentController } from "../../document/DocumentController";
import { Command } from "../../command/Command";

class InsertImageApplicationCommand extends Command {
    private _documentController: DocumentController;
    
    private _path: string;
    private _position?: number;

    constructor(documentController: DocumentController, path: string, position?: number) {
        super();

        this._documentController = documentController;
        this._path = path;
        this._position = position;
    }
    
    doExecute(): void {
        this._documentController.insertImage(this._path, this._position);
    }
}

export {
    InsertImageApplicationCommand,
}