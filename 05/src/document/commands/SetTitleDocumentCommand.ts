import { IDocument } from "../IDocument";
import { UnexecutableCommand } from "../../command/UnexecutableCommand";

class SetTitleDocumentCommand extends UnexecutableCommand {
    private _document: IDocument;
    private _newTitle: string;
    private _oldTitle: string;
    private _chain: SetTitleDocumentCommand[] = [];

    constructor(document: IDocument, title: string) {
        super();
        this._document = document;
        this._newTitle = title;
        this._oldTitle = document.getTitle();
    }

    protected doExecute(): void {
        this._document.setTitle(this._newTitle);
        for (const c of this._chain) {
            c.execute();
        }
    }

    protected doUnexecute(): void {
        for (let i = this._chain.length - 1; i >= 0; i--) {
            this._chain[i].unexecute();
        }
        this._document.setTitle(this._oldTitle);
    }

    tryMerge(command: UnexecutableCommand): boolean {
        if (!(command instanceof SetTitleDocumentCommand)) {
            return false;
        }
        this._chain.push(command);
        return true;
    }
}

export {
    SetTitleDocumentCommand,
};