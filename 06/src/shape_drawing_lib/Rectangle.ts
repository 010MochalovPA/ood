import { ICanvas } from "../graphics_lib/ICanvas";
import { IDrawable } from "./IDrawable";
import { IPoint } from "./IPoint";

class Rectangle implements IDrawable {
    constructor(
        private leftTop: IPoint,
        private width: number,
        private height: number,
        private color: number = 0x000000,
    ) { }

    draw(canvas: ICanvas): void {
        const { x, y } = this.leftTop;

        canvas.setColor(this.color);
        canvas.moveTo(x, y);
        canvas.lineTo(x + this.width, y);
        canvas.lineTo(x + this.width, y + this.height);
        canvas.lineTo(x, y + this.height);
        canvas.lineTo(x, y);
    }
}

export {
    Rectangle,
}