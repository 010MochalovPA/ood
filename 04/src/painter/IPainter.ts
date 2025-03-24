import { PictureDraft } from "../picturedraft/PictureDraft";
import { ICanvas } from "../canvas/ICanvas";

interface IPainter {
    drawPicture(draft: PictureDraft, canvas: ICanvas): void;
}

export {
    IPainter,
};