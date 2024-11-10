import { Point, Size } from "../types";

interface ICanvas {
    setColor(color: string): void;
    drawRectangle(point: Point, size: Size): void;
    drawCircle(point: Point, radius: number): void;
    drawTriangle(point1: Point, point2: Point, point3: Point): void;
    drawLine(point1: Point, point2: Point): void;
    drawText(point: Point, fontSize: number, data: string): void;
}

export {ICanvas}