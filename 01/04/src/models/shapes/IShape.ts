import { ICanvas } from "../../gfx/ICanvas";

interface IShape {
    performDraw(canvas: ICanvas): void;
    performToString(): string
    performMove(dx: number, dy: number): void;
    changeColor(color: string): void

    get id(): string
}

export {IShape}