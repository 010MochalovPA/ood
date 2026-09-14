import { DocumentController } from "../../document/DocumentController";
import { InsertImageArgs } from "../../document/types";
import { parseImageSize } from "../utils/parseImageSize";
import { parsePath } from "../utils/parsePath";
import { parsePositionOrEnd } from "../utils/parsePosition";
import { splitArgs } from "../utils/splitArgs";
import { MenuCommand } from "./MenuCommand";

class InsertImageMenuCommand extends MenuCommand {
    private _documentController: DocumentController;

    constructor(documentController: DocumentController) {
        super(
            'InsertImage',
            'Insert an image at the given position',
            'InsertImage <position>|end <width> <height> <path>',
        );
        this._documentController = documentController;
    }

    doExecute(args: string): void {
        this._documentController.insertImage(this._parseArgs(args));
    }

    protected _parseArgs(args: string): InsertImageArgs {
        const [position, width, height, ...pathParts] = splitArgs(args, 4);
        const count = this._documentController.getItemsCount();

        return {
            position: parsePositionOrEnd(position, count),
            width: parseImageSize(width),
            height: parseImageSize(height),
            path: parsePath(pathParts.join(' ')),
        };
    }
}

export {
    InsertImageMenuCommand,
};