import { IShapeStrategy } from "./strategies/IShapeStrategy";
import { ICanvas } from "../../gfx/ICanvas";
import { IShape } from "./IShape";

abstract class Shape implements IShape {
    protected _shapeStrategy: IShapeStrategy;

    constructor(
        protected _id: string,
        protected _color: string,
    ) {}

    get id(): string {
        return this._id;
    }

    set shapeStrategy(strategy: IShapeStrategy) {
        this._shapeStrategy = strategy;
    }

    get shapeStrategy(): IShapeStrategy {
        return this._shapeStrategy;
    }

    public performDraw(canvas: ICanvas): void {
        this._shapeStrategy.draw(canvas);
    }

    abstract performToString(): string;

    public performMove(dx: number, dy: number): void {
        this.shapeStrategy.move(dx, dy);
    }

    public changeColor(color: string): void {
        this._color = color;
    }
}

export { Shape };