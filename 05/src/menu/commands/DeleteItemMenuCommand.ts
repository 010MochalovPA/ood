import { DocumentController } from "../../document/DocumentController";
import { DeleteItemArgs } from "../../document/types";
import { parsePosition } from "../utils/parsePosition";
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
        const count = this._documentController.getItemsCount();

        return {
            position: parsePosition(position, count),
        };
    }
}

export {
    DeleteItemMenuCommand,
}