import { UnexecutableCommand } from "../../command/UnexecutableCommand";
import { Paragraph } from "../items/Paragraph";

class ReplaceTextDocumentCommand extends UnexecutableCommand {
    private _paragraph: Paragraph;
    private _newText: string;
    private _oldText: string;
    private _chain: ReplaceTextDocumentCommand[] = [];

    constructor(paragraph: Paragraph, text: string) {
        super();
        this._paragraph = paragraph;
        this._newText = text;
        this._oldText = paragraph.text;
    }

    getParagraph(): Paragraph {
        return this._paragraph;
    }

    protected doExecute(): void {
        this._paragraph.text = this._newText;
        for (const c of this._chain) {
            c.execute();
        }
    }

    protected doUnexecute(): void {
        for (let i = this._chain.length - 1; i >= 0; i--) {
            this._chain[i].unexecute();
        }
        this._paragraph.text = this._oldText;
    }

    tryMerge(command: UnexecutableCommand): boolean {
        if (!(command instanceof ReplaceTextDocumentCommand)) {
            return false;
        }
        if (command.getParagraph() !== this.getParagraph()) {
            return false;
        }
        this._chain.push(command);
        return true;
    }
}

export {
    ReplaceTextDocumentCommand,
};