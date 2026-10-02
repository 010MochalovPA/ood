import { ICanvas } from "../graphics_lib/ICanvas";
import { IDrawable } from "./IDrawable";
import { IPoint } from "./IPoint";

class Triangle implements IDrawable {
    constructor(
        private p1: IPoint,
        private p2: IPoint,
        private p3: IPoint,
        private color: number = 0x000000,
    ) { }

    draw(canvas: ICanvas): void {
        canvas.setColor(this.color);
        canvas.moveTo(this.p1.x, this.p1.y);
        canvas.lineTo(this.p2.x, this.p2.y);
        canvas.lineTo(this.p3.x, this.p3.y);
        canvas.lineTo(this.p1.x, this.p1.y);
    }
}

export {
    Triangle,
}