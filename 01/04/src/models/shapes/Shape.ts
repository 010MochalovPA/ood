import { IShapeStrategy } from "./strategies/IShapeStrategy";
import { ICanvas } from "../../gfx/ICanvas";
import { IShape } from "./IShape";

class Shape implements IShape {
    constructor(
        private _id: string,
        private _shapeStrategy: IShapeStrategy,
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

    public performToString(): string {
        return `${this._id} ${this._shapeStrategy.toString()}`;
    }

    public performMove(dx: number, dy: number): void {
        this.shapeStrategy.move(dx, dy);
    }

    set color(color: string) {
        this._shapeStrategy.color = color;
    }

    get color(): string {
        return this._shapeStrategy.color
    }
}

export { Shape };