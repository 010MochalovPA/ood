import { DocumentController } from "../../document/DocumentController";
import { Command } from "../../command/Command";

class ListApplicationCommand extends Command {
    private _documentController: DocumentController;

    constructor(documentController: DocumentController) {
        super();

        this._documentController = documentController;
    }

    doExecute(): void {
        const title = this._documentController.getTitle();
        const items = this._documentController.getItems();

        console.log(`Title: ${title}`);

        items.forEach((item, index) => console.log(`${index}. ${item.toString()}`));
    }
}

export {
    ListApplicationCommand,
}