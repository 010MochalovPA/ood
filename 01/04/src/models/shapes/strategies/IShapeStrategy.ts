import { ICanvas } from "../../../gfx/ICanvas";

interface IShapeStrategy {
    draw(canvas: ICanvas): void;
    move(dx: number, dy: number);
    toString(): string;
}

export { IShapeStrategy }