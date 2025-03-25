import { IDesigner } from "../designer/IDesigner";
import { HTMLCanvas } from "../canvas/HTMLCanvas";
import { IPainter } from "../painter/IPainter";

class Client {
    #designer: IDesigner;
    #painter: IPainter;

    constructor(designer: IDesigner, painter: IPainter) {
        this.#designer = designer;
        this.#painter = painter;
    }

    public renderShapes(canvasElement: HTMLCanvasElement, shapeDescriptions: string): void {
        const canvas = new HTMLCanvas(canvasElement);
        const draft = this.#designer.createDraft(shapeDescriptions);

        this.#painter.drawPicture(draft, canvas);
    }
}

export {
    Client,
};