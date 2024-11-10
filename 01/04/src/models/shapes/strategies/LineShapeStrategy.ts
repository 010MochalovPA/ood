import { IShapeStrategy } from "./IShapeStrategy";
import { ICanvas } from "../../../gfx/ICanvas";
import { Point, Size } from "../../../types";
import { movePoint } from "../../../utils/shapeUtils";

class LineShapeStrategy implements IShapeStrategy {
    constructor(
        private _color: string,
        private _point1: Point,
        private _point2: Point,
    ) {}

    public draw(canvas: ICanvas): void {
        canvas.setColor(this._color);
        canvas.drawLine(this._point1, this._point2);
    }

    public move(dx: number, dy: number) {
        this._point1 = movePoint(this._point1, dx, dy);
        this._point2 = movePoint(this._point2, dx, dy);
    }

    public toString(): string {
        return `${this._point1.x} ${this._point1.y} ${this._point2.x} ${this._point2.y}`;
    }
}

export { LineShapeStrategy };