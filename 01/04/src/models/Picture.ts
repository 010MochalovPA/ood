import { IShape } from "./shapes/IShape";
import { ICanvas } from "../gfx/ICanvas";
import { Point, Size } from "../types";
import { RectangleShapeStrategy } from "./shapes/strategies/RectangleShapeStrategy";
import { CircleShapeStrategy } from "./shapes/strategies/CircleShapeStrategy";
import { TriangleShapeStrategy } from "./shapes/strategies/TriangleShapeStrategy";
import { LineShapeStrategy } from "./shapes/strategies/LineShapeStrategy";
import { TextShapeStrategy } from "./shapes/strategies/TextShapeStrategy";

type ShapesMap = Map<string, IShape>

class Picture {
    private _shapes: ShapesMap = new Map();

    public addShape(shape: IShape): void {
        if (!this._shapes.has(shape.id)) {
            this._shapes.set(shape.id, shape);
            return;
        }
        
        console.error(`Фигура с id:${shape.id} уже существует!`);
    }

    public draw(canvas: ICanvas): void {
        this._shapes.forEach(shape => shape.performDraw(canvas));
    }

    public list(): ShapesMap {
        return this._shapes;
    }

    public moveShape(id: string, dx: number, dy: number): void {
        const shape = this._shapes.get(id);

        if (shape) {
            shape.performMove(dx, dy);
            return;
        }

        console.error(`Фигура с id:${id} не найдена!`);
    }

    public movePicture(dx: number, dy: number): void {
        this._shapes.forEach(shape => shape.performMove(dx, dy));
    }

    public deleteShape(id: string): void {
        if (this._shapes.has(id)) {
            this._shapes.delete(id);
            return;
        }

        console.error(`Фигура с id:${id} не найдена!`);
    }

    public changeToRectangle(id: string, point: Point, size: Size): void {
        const shape = this._shapes.get(id);

        if (shape) {
            shape.shapeStrategy = new RectangleShapeStrategy(shape.color, point, size);
            return;
        }

        console.error(`Фигура с id:${id} не найдена!`);
    }

    public changeToCircle(id: string, point: Point, radius: number): void {
        const shape = this._shapes.get(id);

        if (shape) {
            shape.shapeStrategy = new CircleShapeStrategy(shape.color, point, radius);
            return;
        }

        console.error(`Фигура с id:${id} не найдена!`);
    }

    public changeToTriangle(id: string, point1: Point, point2: Point, point3: Point): void {
        const shape = this._shapes.get(id);

        if (shape) {
            shape.shapeStrategy = new TriangleShapeStrategy(shape.color, point1, point2, point3);
            return;
        }

        console.error(`Фигура с id:${id} не найдена!`);
    }

    public changeToLine(id: string, point1: Point, point2: Point): void {
        const shape = this._shapes.get(id);

        if (shape) {
            shape.shapeStrategy = new LineShapeStrategy(shape.color, point1, point2);
            return;
        }

        console.error(`Фигура с id:${shape.id} не найдена!`);
    }

    public changeToText(id: string, point: Point, fontSize: number, data: string): void {
        const shape = this._shapes.get(id);

        if (shape) {
            shape.shapeStrategy = new TextShapeStrategy(shape.color, point, fontSize, data);
            return;
        }

        console.error(`Фигура с id:${id} не найдена!`);
    }

    public drawShape(id: string, canvas: ICanvas): void {
        const shape = this._shapes.get(id);

        if (shape) {
            shape.performDraw(canvas)
            return;
        }

        console.error(`Фигура с id:${id} не найдена!`);
    }

    public changeColor(id: string, color: string): void {
        const shape = this._shapes.get(id);

        if (shape) {
            shape.color = color;
            return;
        }

        console.error(`Фигура с id:${id} не найдена!`);
    }
}
    
export { Picture };