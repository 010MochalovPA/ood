import { Shape } from "../shape/Shape";

interface IShapeFactory {
    createShape(description: string): Shape;
}

export {
    IShapeFactory,
};