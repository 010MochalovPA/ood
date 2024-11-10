import { IShapeStrategy } from "./IShapeStrategy";
import { ICanvas } from "../../../gfx/ICanvas";
import { Point } from "../../../types";
import { movePoint } from "../../../utils/shapeUtils";

class TextShapeStrategy implements IShapeStrategy {
    constructor(
        private _color: string,
        private _point: Point,
        private _fontSize: number,
        private _data: string,
    ) {}

    public draw(canvas: ICanvas): void {
        canvas.setColor(this._color);
        canvas.drawText(this._point, this._fontSize, this._data);
    }

    public move(dx: number, dy: number): void {
        this._point = movePoint(this._point, dx, dy);
    }

    public toString(): string {
        return `${this._point.x} ${this._point.y} ${this._fontSize} ${this._data}`;
    }
}

export { TextShapeStrategy };