import { IShapeStrategy } from "./IShapeStrategy";
import { ICanvas } from "../../../gfx/ICanvas";
import { Point, Size } from "../../../types";
import { movePoint } from "../../../utils/shapeUtils";

class RectangleShapeStrategy implements IShapeStrategy {
    constructor(
        private _color: string,
        private _point: Point,
        private _size: Size,
    ) {}

    public draw(canvas: ICanvas): void {
        canvas.setColor(this._color);
        canvas.drawRectangle(this._point, this._size);
    }

    public move(dx: number, dy: number): void {
        this._point = movePoint(this._point, dx, dy);
    }

    public toString(): string {
        return `rectangle  ${this._color} ${this._point.x} ${this._point.y} ${this._size.width} ${this._size.height}`
    }

    get color(): string {
        return this._color;
    }
 
    set color(color: string) {
        this._color = color;
    }
}

export { RectangleShapeStrategy };