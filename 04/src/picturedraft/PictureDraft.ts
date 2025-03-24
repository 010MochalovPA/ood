import { Shape } from "../shape/Shape";

class PictureDraft {
    #shapes: Shape[] = [];

    addShape(shape: Shape) {
        this.#shapes.push(shape);
    }

    getShapeCount(): number {
        return this.#shapes.length;
    }

    getShape(index: number): Shape {
        if (index < 0 || index >= this.#shapes.length) {
            throw new Error("Index out of bounds");
        }
        return this.#shapes[index];
    }
}

export {
    PictureDraft,
};