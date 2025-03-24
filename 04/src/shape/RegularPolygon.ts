import { ICanvas } from "../canvas/ICanvas";
import { Color } from "../common/Color";
import { Point } from "../common/Point";
import { Shape } from "./Shape";

class RegularPolygon extends Shape {
	#center: Point;
	#vertexCount: number;
	#radius: number;

	constructor(color: Color, center: Point, vertexCount: number, radius: number) {
		if (vertexCount < 3) {
            throw new Error("Vertex count must be at least 3");
        }
		super(color);

		this.#center = center;
		this.#vertexCount = vertexCount;
		this.#radius = radius;
	}

	draw(canvas: ICanvas): void {
		const vertices = this.#calculateVertices();

		canvas.setColor(this._color);
		
        for (let i = 0; i < vertices.length; i++) {
            const from = vertices[i];
            const to = vertices[(i + 1) % vertices.length];
            canvas.drawLine(from, to);
        }
	};

	getRadius(): number {
		return this.#radius;
	}

	getCenter(): Point {
		return this.#center;
	}

	getVertexCount(): number {
        return this.#vertexCount
    }

	#calculateVertices(): Point[] {
		const vertices: Point[] = [];
		const angleStep = (2 * Math.PI) / this.#vertexCount;
		const startAngle = -Math.PI / 2;
		
		for (let i = 0; i < this.#vertexCount; i++) {
			const angle = startAngle + i * angleStep;
			vertices.push({
				x: Math.round(this.#center.x + this.#radius * Math.cos(angle)),
				y: Math.round(this.#center.y + this.#radius * Math.sin(angle)),
			});
		}
		
		return vertices;
	}
}

export {
	RegularPolygon,
};