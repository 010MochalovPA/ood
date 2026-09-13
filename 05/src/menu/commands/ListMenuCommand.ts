import { DocumentController } from "../../document/DocumentController";
import { MenuCommand } from "./MenuCommand";

class ListMenuCommand extends MenuCommand {
    private _documentController: DocumentController;

    constructor(documentController: DocumentController) {
        super(
            'List',
            'Display the document contents',
            'List'
        );
        this._documentController = documentController;
    }

    doExecute(): void {
        const title = this._documentController.getTitle();
        const items = this._documentController.getItems();
        
        console.log(title);
        
        if (items.length) {
            items.forEach((item, index) => {
                console.log(`${index + 1}. ${item.toString()}`)
            })
        }
        else {
            console.log('Document is empty')
        }
    }
}

export {
    ListMenuCommand,
}