import { UnexecutableCommand } from "../../command/UnexecutableCommand";
import { Image } from "../items/Image";

class ResizeImageDocumentCommand extends UnexecutableCommand {
    private _image: Image;
    private _newWidth: number;
    private _newHeight: number;
    private _oldWidth: number;
    private _oldHeight: number;
    private _chain: ResizeImageDocumentCommand[] = [];

    constructor(image: Image, width: number, height: number) {
        super();
        this._image = image;
        this._newWidth = width;
        this._newHeight = height;
        this._oldWidth = image.width;
        this._oldHeight = image.height;
    }

    getImage(): Image {
        return this._image;
    }

    protected doExecute(): void {
        this._image.resize(this._newWidth, this._newHeight);
        for (const c of this._chain) {
            c.execute();
        }
    }

    protected doUnexecute(): void {
        for (let i = this._chain.length - 1; i >= 0; i--) {
            this._chain[i].unexecute();
        }
        this._image.resize(this._oldWidth, this._oldHeight);
    }

    tryMerge(command: UnexecutableCommand): boolean {
        if (!(command instanceof ResizeImageDocumentCommand)) {
            return false;
        }
        if (command.getImage() !== this.getImage()) {
            return false;
        }
        this._chain.push(command);
        return true;
    }
}

export {
    ResizeImageDocumentCommand,
};