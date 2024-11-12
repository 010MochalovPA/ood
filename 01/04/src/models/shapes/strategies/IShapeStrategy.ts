import { ICanvas } from "../../../gfx/ICanvas";

interface IShapeStrategy {
    draw(canvas: ICanvas): void;
    move(dx: number, dy: number): void;
    toString(): string;

    set color(color: string);
    get color(): string;
}

export { IShapeStrategy }