import { Point } from "../../types";
import { Shape } from "./Shape";
import { LineShapeStrategy } from "./strategies/LineShapeStrategy";

class Line extends Shape {
    constructor(id: string, color: string, private _point1: Point, private _point2: Point) {
        super(id, color);

        this._shapeStrategy = new LineShapeStrategy(color, this._point1, this._point2);
    }

    public performToString(): string {
        return `line ${this._id} ${this._color} ${this._shapeStrategy.toString()}`
    }
}

export { Line };