import { ICanvas } from "../canvas/ICanvas";
import { Color } from "../common/Color";
import { Point } from "../common/Point";
import { Shape } from "./Shape";

class Triangle extends Shape {
	#vertex1: Point;
	#vertex2: Point;
	#vertex3: Point;

	constructor(color: Color, vertex1: Point, vertex2: Point, vertex3: Point) {
		super(color);

		this.#vertex1 = vertex1;
		this.#vertex2 = vertex2;
		this.#vertex3 = vertex3;
	}

	draw(canvas: ICanvas): void {
		canvas.setColor(this._color);
		canvas.drawLine(this.#vertex1, this.#vertex2);
		canvas.drawLine(this.#vertex2, this.#vertex3);
		canvas.drawLine(this.#vertex3, this.#vertex1);
	};

	getVertex(index: number): Point {
		switch (index) {
			case 1:
				return this.#vertex1;
			case 2:
				return this.#vertex2;
			case 3:
				return this.#vertex3;
			default:
				throw new Error("Unknown Vertex index");
		}
	}
}

export {
	Triangle,
};