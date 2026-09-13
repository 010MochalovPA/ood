import { DocumentController } from "../../document/DocumentController";
import { DeleteItemArgs } from "../../document/types";
import { parseIndex } from "../utils/parseIndex";
import { splitArgs } from "../utils/splitArgs";
import { MenuCommand } from "./MenuCommand";

class DeleteItemMenuCommand extends MenuCommand {
    private _documentController: DocumentController;

    constructor(documentController: DocumentController) {
        super(
            'DeleteItem',
            'Delete an item at the specified position',
            'DeleteItem <position>'
        );
        this._documentController = documentController;
    }

    doExecute(args: string): void {
        this._documentController.deleteItem(this._parseArgs(args));
    }

    protected _parseArgs(args: string): DeleteItemArgs {
        const [position] = splitArgs(args, 1);

        return {
            position: parseIndex(position, this._documentController.getItemsCount()),
        };
    }
}

export {
    DeleteItemMenuCommand,
}