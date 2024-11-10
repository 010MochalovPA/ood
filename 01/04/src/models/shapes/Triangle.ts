import { Point } from "../../types";
import { Shape } from "./Shape";
import { TriangleShapeStrategy } from "./strategies/TriangleShapeStrategy";

class Triangle extends Shape {
    constructor(id: string, color: string, private _point1: Point, private _point2: Point, private _point3: Point) {
        super(id, color);

        this._shapeStrategy = new TriangleShapeStrategy(color, this._point1, this._point2, this._point3);
    }

    public performToString(): string {
        return `triangle ${this._id} ${this._color} ${this._shapeStrategy.toString()}`
    }
}

export { Triangle };