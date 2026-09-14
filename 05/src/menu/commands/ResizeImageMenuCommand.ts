import { DocumentController } from "../../document/DocumentController";
import { ResizeImageArgs } from "../../document/types";
import { parseImageSize } from "../utils/parseImageSize";
import { parsePosition } from "../utils/parsePosition";
import { splitArgs } from "../utils/splitArgs";
import { MenuCommand } from "./MenuCommand";

class ResizeImageMenuCommand extends MenuCommand {
    private _documentController: DocumentController;

    constructor(documentController: DocumentController) {
        super(
            'ResizeImage',
            'Resize the image at the given position',
            'ResizeImage <position> <width> <height>',
        );
        this._documentController = documentController;
    }

    doExecute(args: string): void {
        this._documentController.resizeImage(this._parseArgs(args));
    }

    protected _parseArgs(args: string): ResizeImageArgs {
        const [position, width, height] = splitArgs(args, 3);
        const count = this._documentController.getItemsCount();

        return {
            position: parsePosition(position, count),
            width: parseImageSize(width),
            height: parseImageSize(height),
        };
    }
}

export {
    ResizeImageMenuCommand,
};