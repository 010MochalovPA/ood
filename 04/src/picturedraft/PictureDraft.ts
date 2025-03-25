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
        if (this.#shapes[index]) {
            return this.#shapes[index];
        }

        throw new Error("Index out of bounds");
    }
}

export {
    PictureDraft,
};