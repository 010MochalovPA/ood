import { IShapeStrategy } from "./IShapeStrategy";
import { ICanvas } from "../../../gfx/ICanvas";
import { Point } from "../../../types";
import { Shape } from "../Shape";
import { movePoint } from "../../../utils/shapeUtils";

class CircleShapeStrategy implements IShapeStrategy {
    constructor(
        private _color: string,
        private _point: Point,
        private _radius: number,
    ) {}

    public draw(canvas: ICanvas): void {
        canvas.setColor(this._color);
        canvas.drawCircle(this._point, this._radius);
    }

    public move(dx: number, dy: number): void {
        this._point = movePoint(this._point, dx, dy);
    }

    public toString(): string {
        return `${this._point.x} ${this._point.y} ${this._radius}`;
    }
}

export { CircleShapeStrategy };