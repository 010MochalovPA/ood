import { IShape } from "./shapes/IShape";
import { ICanvas } from "../gfx/ICanvas";

type ShapesMap = Map<string, IShape>

class Picture {
    private _shapes: ShapesMap = new Map();

    public addShape(shape: IShape): void {
        if (this._shapes.has(shape.id)) {
            console.error(`Фигура с id:${shape.id} уже существует!`);
            return;
        }
        this._shapes.set(shape.id, shape);
    }

    public draw(canvas: ICanvas): void {
        this._shapes.forEach(shape => shape.performDraw(canvas));
    }

    public list(): ShapesMap {
        return this._shapes;
    }

    public moveShape(id: string, dx: number, dy: number): void {
        const shape = this._shapes.get(id);

        if (!shape) {
            console.error(`Фигура с id:${shape.id} не найдена!`);
            return;
        }

        shape.performMove(dx, dy);
    }

    public movePicture(dx: number, dy: number): void {
        this._shapes.forEach(shape => shape.performMove(dx, dy));
    }

    public deleteShape(id: string): void {
        const shape = this._shapes.get(id);

        if (!shape) {
            console.error(`Фигура с id:${shape.id} не найдена!`);
            return;
        }

        this._shapes.delete(id);
    }

    public drawShape(id: string, canvas: ICanvas): void {
        const shape = this._shapes.get(id);

        if (!shape) {
            console.error(`Фигура с id:${shape.id} не найдена!`);
            return;
        }

        shape.performDraw(canvas)
    }

    public changeColor(id: string, color: string): void {
        const shape = this._shapes.get(id);

        if (!shape) {
            console.error(`Фигура с id:${shape.id} не найдена!`);
            return;
        }

        shape.changeColor(color);
    }
}
    
export { Picture };