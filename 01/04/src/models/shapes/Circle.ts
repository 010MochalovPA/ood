import { Point, Size } from "../../types";
import { Shape } from "./Shape";
import { CircleShapeStrategy } from "./strategies/CircleShapeStrategy";

class Circle extends Shape {
    constructor(id: string, color: string, point: Point, radius: number) {
        super(id, color);

        this._shapeStrategy = new CircleShapeStrategy(color, point, radius);
    }

    public performToString(): string {
        return `circle ${this._id} ${this._color} ${this._shapeStrategy.toString()}`
    }
}

export { Circle };