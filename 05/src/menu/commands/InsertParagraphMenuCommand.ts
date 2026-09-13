import { DocumentController } from "../../document/DocumentController";
import { InsertParagraphArgs } from "../../document/types";
import { parsePositionOrEnd } from "../utils/parsePosition";
import { parseText } from "../utils/parseText";
import { splitArgs } from "../utils/splitArgs";
import { MenuCommand } from "./MenuCommand";

class InsertParagraphMenuCommand extends MenuCommand {
    private _documentController: DocumentController;

    constructor(documentController: DocumentController) {
        super(
            'InsertParagraph',
            'Insert a paragraph at the specified position',
            'InsertParagraph <position|end> <text>'
        );
        this._documentController = documentController;
    }

    doExecute(args: string): void {
        this._documentController.insertParagraph(this._parseArgs(args));
    }

    protected _parseArgs(args: string): InsertParagraphArgs {
        const [position, ...text] = splitArgs(args, 2);

        return {
            position: parsePositionOrEnd(position, this._documentController.getItemsCount()),
            text: parseText(text.join(' ')),
        };
    }
}

export {
    InsertParagraphMenuCommand,
}