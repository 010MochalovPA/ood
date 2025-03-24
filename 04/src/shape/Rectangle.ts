import { ICanvas } from "../canvas/ICanvas";
import { Color } from "../common/Color";
import { Point } from "../common/Point";
import { Shape } from "./Shape";

class Rectangle extends Shape {
	#leftTop: Point;
	#rightBottom: Point;

	constructor(color: Color, leftTop: Point, rightBottom: Point) {
		super(color);

		this.#leftTop = leftTop;
		this.#rightBottom = rightBottom;
	}

	draw(canvas: ICanvas): void {
		const point1 = {x: this.#leftTop.x, y: this.#leftTop.y};
		const point2 = {x: this.#rightBottom.x, y: this.#leftTop.y};
		const point3 = {x: this.#rightBottom.x, y: this.#rightBottom.y};
		const point4 = {x: this.#leftTop.x, y: this.#rightBottom.y};

		canvas.setColor(this._color);
		canvas.drawLine(point1, point2);
		canvas.drawLine(point2, point3);
		canvas.drawLine(point3, point4);
		canvas.drawLine(point4, point1);
	};

	getLeftTop(): Point {
		return this.#leftTop;
	}

	getRightBottom(): Point {
		return this.#rightBottom;
	}
}

export {
	Rectangle,
};