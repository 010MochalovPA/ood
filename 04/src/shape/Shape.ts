import { ICanvas } from "../canvas/ICanvas";
import { Color } from "../common/Color";
import { colorToHex } from "../common/colortohex";

abstract class Shape {
    _color: Color;

    constructor(color: Color) {
        this._color = color;
    }

    abstract draw(canvas: ICanvas): void;

    getColor(): string {
        return colorToHex(this._color);
    }
}

export {
    Shape,
};