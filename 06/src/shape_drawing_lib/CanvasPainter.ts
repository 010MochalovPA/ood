import { ICanvas } from "../graphics_lib/ICanvas";
import { IDrawable } from "./IDrawable";

class CanvasPainter {
    constructor(private canvas: ICanvas) { }

    draw(drawable: IDrawable): void {
        drawable.draw(this.canvas);
    }
}

export {
    CanvasPainter,
}