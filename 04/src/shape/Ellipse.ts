import { ICanvas } from "../canvas/ICanvas";
import { Color } from "../common/Color";
import { Point } from "../common/Point";
import { Shape } from "./Shape";

class Ellipse extends Shape {
	#center: Point;
	#width: number;
	#height: number;

	constructor(color: Color, center: Point, width: number, height: number) {
		super(color);

		this.#center = center;
		this.#width = width;
		this.#height = height;
	}

	draw(canvas: ICanvas): void {
		canvas.setColor(this._color);
		canvas.drawElipse(this.#center, this.#width, this.#height);
	};

	getCenter(): Point {
		return this.#center;
	}

	getRadiusX(): number {
		return this.#width / 2;
	}

	getRadiusY(): number {
		return this.#height / 2;
	}
}

export {
	Ellipse,
};