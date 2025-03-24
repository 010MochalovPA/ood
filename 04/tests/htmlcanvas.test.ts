import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { createCanvas } from '@napi-rs/canvas';
import { HTMLCanvas } from "../src/canvas/HTMLCanvas";
import { Color } from "../src/common/Color";
import { Point } from "../src/common/Point";

expect.extend({ toMatchImageSnapshot });

describe("HTMLCanvas", () => {
    let canvas: any;
    let htmlCanvas: HTMLCanvas;
    let context: CanvasRenderingContext2D;
    const width = 200;
    const height = 200;

    beforeEach(() => {
        canvas = createCanvas(width, height);
        htmlCanvas = new HTMLCanvas(canvas);

        context = canvas.getContext("2d") as CanvasRenderingContext2D;
        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, width, height);
    });

    describe("constructor", () => {
        test("constructor should initialize canvas and context", () => {
            const htmlCanvas = new HTMLCanvas(canvas);
            expect(htmlCanvas).toBeDefined();
        });

        test("constructor should throw error if context is not available", () => {
            jest.spyOn(canvas, "getContext").mockReturnValue(null);

            expect(() => new HTMLCanvas(canvas)).toThrow("Failed to get 2D rendering context.");
        });
    });

    describe("setColor", () => {
        test("should set the fillStyle of the context to the correct color", () => {
            const htmlCanvas = new HTMLCanvas(canvas);

            htmlCanvas.setColor(Color.Green);
            expect([context.fillStyle, context.strokeStyle]).toEqual(["#00FF00", "#00FF00"]);

            htmlCanvas.setColor(Color.Blue);
            expect([context.fillStyle, context.strokeStyle]).toEqual(["#0000FF", "#0000FF"]);

            htmlCanvas.setColor(Color.Red);
            expect([context.fillStyle, context.strokeStyle]).toEqual(["#FF0000", "#FF0000"]);

            htmlCanvas.setColor(Color.Yellow);
            expect([context.fillStyle, context.strokeStyle]).toEqual(["#FFFF00", "#FFFF00"]);

            htmlCanvas.setColor(Color.White);
            expect([context.fillStyle, context.strokeStyle]).toEqual(["#FFFFFF", "#FFFFFF"]);

            htmlCanvas.setColor(Color.Black);
            expect([context.fillStyle, context.strokeStyle]).toEqual(["#000000", "#000000"]);

            htmlCanvas.setColor(Color.Pink);
            expect([context.fillStyle, context.strokeStyle]).toEqual(["#FFC0CB", "#FFC0CB"]);
        });

        test("should throw an error for an unknown color", () => {
            const htmlCanvas = new HTMLCanvas(canvas);
            const unknownColor = 999 as Color;

            expect(() => htmlCanvas.setColor(unknownColor)).toThrow("Unknown color: 999");
        });
    });

    describe("drawLine", () => {
        test("should draw a visible line and match snapshot", () => {
            htmlCanvas.setColor(Color.Green);

            const from: Point = { x: 10, y: 10 };
            const to: Point = { x: 190, y: 190 };

            htmlCanvas.drawLine(from, to);

            const buffer = canvas.toBuffer('image/png');

            expect(buffer).toBeDefined();
            expect(buffer.length).toBeGreaterThan(100);

            expect(buffer).toMatchImageSnapshot({
                customSnapshotIdentifier: "basic-line-snapshot",
                failureThreshold: 0.01,
                failureThresholdType: "percent"
            });
        });

        test("should draw a triangle and match snapshot", () => {
            htmlCanvas.setColor(Color.Blue);

            const point1: Point = { x: 50, y: 50 };
            const point2: Point = { x: 50, y: 150 };
            const point3: Point = { x: 150, y: 150 };

            htmlCanvas.drawLine(point1, point2);
            htmlCanvas.drawLine(point2, point3);
            htmlCanvas.drawLine(point3, point1);

            const buffer = canvas.toBuffer('image/png');

            expect(buffer).toBeDefined();
            expect(buffer.length).toBeGreaterThan(100);

            expect(buffer).toMatchImageSnapshot({
                customSnapshotIdentifier: "basic-triangle-snapshot",
                failureThreshold: 0.01,
                failureThresholdType: "percent"
            });
        });
    });

    describe("drawEllipse", () => {
        test("should draw a elipce and match snapshot", () => {
            htmlCanvas.setColor(Color.Red);

            const center: Point = { x: 100, y: 100 };
            htmlCanvas.drawElipse(center, 150, 100);

            const buffer = canvas.toBuffer('image/png');

            expect(buffer).toBeDefined();
            expect(buffer.length).toBeGreaterThan(100);

            expect(buffer).toMatchImageSnapshot({
                customSnapshotIdentifier: "basic-ellipse-snapshot",
                failureThreshold: 0.01,
                failureThresholdType: "percent"
            });
        });
    });
});