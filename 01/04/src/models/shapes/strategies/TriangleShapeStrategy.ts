import { IShapeStrategy } from "./IShapeStrategy";
import { ICanvas } from "../../../gfx/ICanvas";
import { Point } from "../../../types";
import { movePoint } from "../../../utils/shapeUtils";

class TriangleShapeStrategy implements IShapeStrategy {
    constructor(
        private _color: string,
        private _point1: Point,
        private _point2: Point,
        private _point3: Point,
    ) {}

    public draw(canvas: ICanvas): void {
        canvas.setColor(this._color);
        canvas.drawTriangle(this._point1, this._point2, this._point3);
    }

    public move(dx: number, dy: number): void {
        this._point1 = movePoint(this._point1, dx, dy);
        this._point2 = movePoint(this._point2, dx, dy);
        this._point3 = movePoint(this._point3, dx, dy);
    }

    public toString(): string {
        return `${this._point1.x} ${this._point1.y} ${this._point2.x} ${this._point2.y} ${this._point3.x} ${this._point3.y}`;
    }
}

export { TriangleShapeStrategy };