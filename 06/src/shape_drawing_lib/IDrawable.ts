import { ICanvas } from "../graphics_lib/ICanvas";

interface IDrawable {
    draw(canvas: ICanvas): void;
}

export {
    IDrawable,
}