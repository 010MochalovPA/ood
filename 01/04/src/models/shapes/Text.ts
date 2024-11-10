import { Point } from "../../types";
import { Shape } from "./Shape";
import { TextShapeStrategy } from "./strategies/TextShapeStrategy";

class Text extends Shape {
    constructor(id: string, color: string, private _point: Point, private _fontSize: number, private _data: string) {
        super(id, color);

        this._shapeStrategy = new TextShapeStrategy(color, this._point, this._fontSize, this._data);
    }

    public performToString(): string {
        return `text ${this._id} ${this._color} ${this._shapeStrategy.toString()}`
    }
}

export { Text };