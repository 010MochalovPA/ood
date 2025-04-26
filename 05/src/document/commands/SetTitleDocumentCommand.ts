import { IDocument } from "../IDocument";
import { UnexecutableCommand } from "../../command/UnexecutableCommand";

class SetTitleDocumentCommand extends UnexecutableCommand {
    private _document: IDocument;
    private _newTitle: string;
    private _oldTitle: string;
    
    constructor(document: IDocument, title: string) {
        super();

        this._document = document;
        this._newTitle = title;
        this._oldTitle = this._document.getTitle();
    }
    
    doExecute(): void {
        this._document.setTitle(this._newTitle);
    }

    doUnexecute(): void {
        this._document.setTitle(this._oldTitle);
    }

    compoundWith(command: UnexecutableCommand): boolean {
        if (!(command instanceof SetTitleDocumentCommand)) {
            return false;
        }
        
        this._newTitle = command._newTitle;
        return true;
    }
}

export {
    SetTitleDocumentCommand,
}