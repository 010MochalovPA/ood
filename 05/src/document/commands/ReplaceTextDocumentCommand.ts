import { UnexecutableCommand } from "../../command/UnexecutableCommand";
import { Paragraph } from "../items/Paragraph";

class ReplaceTextDocumentCommand extends UnexecutableCommand {
    private _paragraph: Paragraph;
    private _newText: string;
    private _oldText: string;
    private _chained: UnexecutableCommand | null = null;

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
        this._chained?.execute();
    }

    protected doUnexecute(): void {
        this._chained?.unexecute();
        this._paragraph.text = this._oldText;
    }

    tryMerge(command: UnexecutableCommand): boolean {
        if (!(command instanceof ReplaceTextDocumentCommand)) {
            return false;
        }

        if (command.getParagraph() !== this.getParagraph()) {
            return false;
        }

        this._chained = command;
        return true;
    }
}

export {
    ReplaceTextDocumentCommand,
};