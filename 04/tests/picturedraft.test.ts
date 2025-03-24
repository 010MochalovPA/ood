import { PictureDraft } from "../src/picturedraft/PictureDraft";
import { Shape } from "../src/shape/Shape";
import { Color } from "../src/common/Color";
import { ICanvas } from "../src/canvas/ICanvas";

class MockShape extends Shape {
    constructor(color: Color) {
        super(color);
    }
    draw(canvas: ICanvas): void { }
}

describe("PictureDraft", () => {
    let draft: PictureDraft;
    let shape1: Shape;
    let shape2: Shape;

    beforeEach(() => {
        draft = new PictureDraft();
        shape1 = new MockShape(Color.Red);
        shape2 = new MockShape(Color.Blue);
    });

    it("should be empty when created", () => {
        expect(draft.getShapeCount()).toBe(0);
    });

    it("should add shapes correctly", () => {
        draft.addShape(shape1);
        expect(draft.getShapeCount()).toBe(1);

        draft.addShape(shape2);
        expect(draft.getShapeCount()).toBe(2);
    });

    it("should return shapes in correct order", () => {
        draft.addShape(shape1);
        draft.addShape(shape2);

        expect(draft.getShape(0)).toBe(shape1);
        expect(draft.getShape(1)).toBe(shape2);
    });

    it("should throw error when getting shape with invalid index", () => {
        expect(() => draft.getShape(0)).toThrowError("Index out of bounds");
        draft.addShape(shape1);
        expect(() => draft.getShape(1)).toThrowError("Index out of bounds");
        expect(() => draft.getShape(-1)).toThrowError("Index out of bounds");
    });

    it("should maintain shapes in insertion order", () => {
        const shapes = [
            new MockShape(Color.Green),
            new MockShape(Color.Yellow),
            new MockShape(Color.Black)
        ];

        shapes.forEach(shape => draft.addShape(shape));

        expect(draft.getShapeCount()).toBe(shapes.length);
        shapes.forEach((shape, index) => {
            expect(draft.getShape(index)).toBe(shape);
        });
    });
});