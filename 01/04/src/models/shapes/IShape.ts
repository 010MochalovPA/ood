import { ICanvas } from "../../gfx/ICanvas";
import { IShapeStrategy } from "./strategies/IShapeStrategy";

interface IShape {
    performDraw(canvas: ICanvas): void;
    performToString(): string
    performMove(dx: number, dy: number): void;

    set color(color: string)

    get color(): string

    set shapeStrategy(strategy: IShapeStrategy)

    get shapeStrategy(): IShapeStrategy

    get id(): string
}

export {IShape}