import { PictureDraft } from "../picturedraft/PictureDraft";
import { ICanvas } from "../canvas/ICanvas";
import { IPainter } from "./IPainter";

class Painter implements IPainter {
    drawPicture(draft: PictureDraft, canvas: ICanvas): void {
        const shapeCount = draft.getShapeCount();

        for (let i = 0; i < shapeCount; i++) {
            const shape = draft.getShape(i);
            shape.draw(canvas);
        }
    }
}

export {
    Painter,
};