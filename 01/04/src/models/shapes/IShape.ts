import { ICanvas } from "../../gfx/ICanvas";
import { IShapeStrategy } from "./strategies/IShapeStrategy";

interface IShape {
    performDraw(canvas: ICanvas): void;
    performToString(): string
    performMove(dx: number, dy: number): void;
    changeColor(color: string): void

    get id(): string
    set shapeStrategy(strategy: IShapeStrategy)
    get shapeStrategy(): IShapeStrategy
}

export {IShape}