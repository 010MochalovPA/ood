import { IDocument } from "../IDocument";
import { UnexecutableCommand } from "../../command/UnexecutableCommand";

class SetTitleDocumentCommand extends UnexecutableCommand {
    private _document: IDocument;
    private _newTitle: string;
    private _oldTitle: string;

    private _chained: UnexecutableCommand | null = null;

    constructor(document: IDocument, title: string) {
        super();
        this._document = document;
        this._newTitle = title;
        this._oldTitle = document.getTitle();
    }

    protected doExecute(): void {
        this._document.setTitle(this._newTitle);
        
        this._chained?.execute();
    }

    protected doUnexecute(): void {
        this._chained?.unexecute();

        this._document.setTitle(this._oldTitle);
    }

    tryMerge(command: UnexecutableCommand): boolean {
        if (!(command instanceof SetTitleDocumentCommand)) {
            return false;
        }

        this._chained = command;
        return true;
    }
}

export {
    SetTitleDocumentCommand,
}