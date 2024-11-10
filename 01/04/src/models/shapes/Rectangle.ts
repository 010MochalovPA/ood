import { Point, Size } from "../../types";
import { Shape } from "./Shape";
import { RectangleShapeStrategy } from "./strategies/RectangleShapeStrategy";

class Rectangle extends Shape {
    constructor(id: string, color: string, private _point: Point, private _size: Size) {
        super(id, color);

        this._shapeStrategy = new RectangleShapeStrategy(color, this._point, this._size);
    }

    public performToString(): string {
        return `rectangle ${this._id} ${this._color} ${this._shapeStrategy.toString()}`
    }
}

export { Rectangle };