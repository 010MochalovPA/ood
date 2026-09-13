import { DocumentController } from "../../document/DocumentController";
import { SetTitleArgs } from "../../document/types";
import { parseText } from "../utils/parseText";
import { splitArgs } from "../utils/splitArgs";
import { MenuCommand } from "./MenuCommand";

class SetTitleMenuCommand extends MenuCommand {
    private _documentController: DocumentController;

    constructor(documentController: DocumentController) {
        super(
            'SetTitle',
            'Set the document title',
            'SetTitle <title>'
        );
        this._documentController = documentController;
    }

    doExecute(args: string): void {
        this._documentController.setTitle(this._parseArgs(args));
    }

    protected _parseArgs(args: string): SetTitleArgs {
        const parts = splitArgs(args, 1);
        const title = parts.join(' ');

        return {
            title: parseText(title),
        };
    }
}

export {
    SetTitleMenuCommand,
}