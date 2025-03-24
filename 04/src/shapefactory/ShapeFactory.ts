import { Color } from "../common/Color";
import { Point } from "../common/Point";
import { ShapeType } from "../common/ShapeType";
import { Shape } from "../shape/Shape";
import { Triangle } from "../shape/Triangle";
import { Rectangle } from "../shape/Rectangle";
import { Ellipse } from "../shape/Ellipse";
import { RegularPolygon } from "../shape/RegularPolygon";
import { IShapeFactory } from "./IShapeFactory";

type ParsedArgs = {
    shapeType: ShapeType;
    color: string;
    coords: number[]
};

class ShapeFactory implements IShapeFactory {
    public createShape(description: string): Shape {
        const { shapeType, color, coords } = this.#parseDescription(description);
        const shapeColor = this.#parseColor(color);

        switch (shapeType) {
            case ShapeType.TRIANGLE:
                return this.#createTriangle(shapeColor, coords);
            case ShapeType.RECTANGLE:
                return this.#createRectangle(shapeColor, coords);
            case ShapeType.ELLIPSE:
                return this.#createEllipse(shapeColor, coords);
            case ShapeType.POLYGON:
                return this.#createRegularPolygon(shapeColor, coords);
            default:
                throw new Error(`Unsupported shape type: ${shapeType}`);
        }
    }

    #parseDescription(descr: string): ParsedArgs {
        const parts = descr.split(' ').filter(p => p !== '');
        if (parts.length < 3) {
            throw new Error("Description must contain at least shape type, color and coordinates");
        }

        return {
            shapeType: this.#parseShapeType(parts[0]),
            color: parts[1].toLowerCase(),
            coords: parts.slice(2).map(Number)
        };
    }

    #parseShapeType(typeStr: string): ShapeType {
        const type = typeStr.toLowerCase();

        if (!Object.values(ShapeType).includes(type as ShapeType)) {
            throw new Error(`Unknown shape type: ${typeStr}`);
        }
        
        return type as ShapeType;
    }

    #parseColor(color: string): Color {
        switch (color.toLowerCase()) {
            case 'pink': return Color.Pink;
            case 'red': return Color.Red;
            case 'green': return Color.Green;
            case 'blue': return Color.Blue;
            case 'yellow': return Color.Yellow;
            case 'black': return Color.Black;
            case 'white': return Color.White;
            default: throw new Error(`Unknown color: ${color}`);
        }
    }

    #createTriangle(color: Color, coords: number[]): Triangle {
        if (coords.length !== 6) {
            throw new Error("Triangle requires exactly 6 coordinates (3 points)");
        }
        const points = this.#createPoints(coords);
        return new Triangle(color, points[0], points[1], points[2]);
    }

    #createRectangle(color: Color, coords: number[]): Rectangle {
        if (coords.length !== 4) {
            throw new Error("Rectangle requires exactly 4 coordinates (2 points)");
        }
        const [x1, y1, x2, y2] = coords;
        return new Rectangle(color, { x: x1, y: y1 }, { x: x2, y: y2 });
    }

    #createEllipse(color: Color, coords: number[]): Ellipse {
        if (coords.length !== 4) {
            throw new Error("Ellipse requires exactly 4 coordinates (center, radiusX, radiusY)");
        }
        const [x, y, rx, ry] = coords;
        return new Ellipse(color, { x, y }, rx, ry);
    }

    #createRegularPolygon(color: Color, coords: number[]): RegularPolygon {
        if (coords.length !== 4) {
            throw new Error("RegularPolygon requires exactly 4 coordinates (center, vertexCount, radius)");
        }
        const [x, y, vertexCount, radius] = coords;
        return new RegularPolygon(color, { x, y }, vertexCount, radius);
    }

    #createPoints(coords: number[]): Point[] {
        const points: Point[] = [];
        for (let i = 0; i < coords.length; i += 2) {
            points.push({ x: coords[i], y: coords[i + 1] });
        }
        return points;
    }
}

export {
    ShapeFactory,
}