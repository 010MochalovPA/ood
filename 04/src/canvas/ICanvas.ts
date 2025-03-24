import { Color } from "../common/Color";
import { Point } from "../common/Point";

interface ICanvas {
    setColor(color: Color): void;
    drawLine(from: Point, to: Point): void;
    drawElipse(center: Point, width: number, height: number): void;
}

export {
    ICanvas,
};