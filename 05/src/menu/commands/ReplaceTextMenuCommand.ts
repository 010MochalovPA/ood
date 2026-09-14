import { DocumentController } from "../../document/DocumentController";
import { ReplaceTextArgs } from "../../document/types";
import { parsePosition } from "../utils/parsePosition";
import { parseText } from "../utils/parseText";
import { splitArgs } from "../utils/splitArgs";
import { MenuCommand } from "./MenuCommand";

class ReplaceTextMenuCommand extends MenuCommand {
    private _documentController: DocumentController;

    constructor(documentController: DocumentController) {
        super(
            'ReplaceText',
            'Replace text of the paragraph at the given position',
            'ReplaceText <position> <text>'
        );
        this._documentController = documentController;
    }

    doExecute(args: string): void {
        this._documentController.replaceText(this._parseArgs(args));
    }

    protected _parseArgs(args: string): ReplaceTextArgs {
        const [position, ...text] = splitArgs(args, 2);
        const count = this._documentController.getItemsCount();

        return {
            position: parsePosition(position, count),
            text: parseText(text.join(' ')),
        };
    }
}

export {
    ReplaceTextMenuCommand,
};