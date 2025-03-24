import { Triangle } from "../src/shape/Triangle";
import { Color } from "../src/common/Color";
import { createCanvas } from '@napi-rs/canvas';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { HTMLCanvas } from "../src/canvas/HTMLCanvas";
import { Ellipse } from "../src/shape/Ellipse";
import { Rectangle } from "../src/shape/Rectangle";
import { Point } from "../src/common/Point";
import { RegularPolygon } from "../src/shape/RegularPolygon";

expect.extend({ toMatchImageSnapshot });

describe("shapes tests", () => {
    let canvas: any;
    let htmlCanvas: HTMLCanvas;
    const width = 200;
    const height = 200;

    beforeEach(() => {
        canvas = createCanvas(width, height);
        htmlCanvas = new HTMLCanvas(canvas);

        const context = canvas.getContext('2d');
        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, width, height);
    });

    describe("triangle tests", () => {
        test("should return correct vertices", () => {
            const triangle = new Triangle(Color.Red, { x: 10, y: 20 }, { x: 30, y: 40 }, { x: 50, y: 60 });

            expect(triangle.getVertex(1)).toEqual({ x: 10, y: 20 });
            expect(triangle.getVertex(2)).toEqual({ x: 30, y: 40 });
            expect(triangle.getVertex(3)).toEqual({ x: 50, y: 60 });
        });

        test("should throw error for invalid vertex index", () => {
            const triangle = new Triangle(Color.Red, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 });

            expect(() => triangle.getVertex(0)).toThrow("Unknown Vertex index");
            expect(() => triangle.getVertex(4)).toThrow("Unknown Vertex index");
        });

        test("should return correct color", () => {
            const triangle = new Triangle(Color.Green, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 });
            expect(triangle.getColor()).toBe('#00FF00');
        });

        test("should draw red triangle correctly", () => {
            const triangle = new Triangle(Color.Red, { x: 50, y: 50 }, { x: 150, y: 50 }, { x: 100, y: 150 });
            triangle.draw(htmlCanvas);

            const buffer = canvas.toBuffer('image/png');
            expect(buffer).toMatchImageSnapshot({
                customSnapshotIdentifier: "red-triangle-snapshot",
                failureThreshold: 0.01,
                failureThresholdType: "percent"
            });
        });
    });

    describe("ellipse tests", () => {
        test("should store properties correctly", () => {
            const ellipse = new Ellipse(Color.Blue, { x: 100, y: 100 }, 150, 80);

            expect(ellipse.getCenter()).toEqual({ x: 100, y: 100 });
            expect(ellipse.getRadiusX()).toBe(75);
            expect(ellipse.getRadiusY()).toBe(40);
        });

        test("should return correct color", () => {
            const ellipse = new Ellipse(Color.Blue, { x: 100, y: 100 }, 150, 80);
            expect(ellipse.getColor()).toBe('#0000FF');
        });

        test("should draw blue ellipse correctly", () => {
            const ellipse = new Ellipse(Color.Blue, { x: 100, y: 100 }, 150, 80);
            ellipse.draw(htmlCanvas);

            const buffer = canvas.toBuffer('image/png');
            expect(buffer).toMatchImageSnapshot({
                customSnapshotIdentifier: "blue-ellipse-snapshot",
                failureThreshold: 0.01
            });
        });
    });

    describe("rectangle tests", () => {
        test("should store properties correctly", () => {
            const rectangle = new Rectangle(Color.Pink, { x: 25, y: 50 }, { x: 175, y: 150 });

            expect(rectangle.getLeftTop()).toEqual({ x: 25, y: 50 });
            expect(rectangle.getRightBottom()).toEqual({ x: 175, y: 150 });
        });

        test("should return correct color", () => {
            const rectangle = new Rectangle(Color.Pink, { x: 25, y: 50 }, { x: 175, y: 150 });
            expect(rectangle.getColor()).toBe('#FFC0CB');
        });

        test("should draw rectangle correctly", () => {
            const rectangle = new Rectangle(Color.Pink, { x: 25, y: 50 }, { x: 175, y: 150 });
            rectangle.draw(htmlCanvas);

            const buffer = canvas.toBuffer('image/png');
            expect(buffer).toMatchImageSnapshot({
                customSnapshotIdentifier: "pink-rectangle-snapshot",
                failureThreshold: 0.01,
                failureThresholdType: "percent"
            });
        });
    });

    describe("regularPolygon tests", () => {
        const center: Point = { x: 100, y: 100 };
        const radius = 50;
        const vertexCount = 6;
        
        test("should store properties correctly", () => {
            const polygon = new RegularPolygon(Color.Red, center, vertexCount, radius);
            
            expect(polygon.getCenter()).toEqual(center);
            expect(polygon.getVertexCount()).toBe(vertexCount);
            expect(polygon.getRadius()).toBe(radius);
        });
    
        test("should return correct color", () => {
            const polygon = new RegularPolygon(Color.Red, center, vertexCount, radius);
            expect(polygon.getColor()).toBe('#FF0000');
        });
    
        test("should throw error for invalid vertex count", () => {
            expect(() => new RegularPolygon(Color.Red, center, 2, radius))
                .toThrow("Vertex count must be at least 3");
        });
    
        test("should calculate vertices correctly", () => {
            const triangle = new RegularPolygon(Color.Blue, center, 3, 100);
            const vertices = triangle.getVertexCount();
            
            expect(vertices).toBe(3);
        });

        test("should draw red hexagon correctly", () => {
            const polygon = new RegularPolygon(Color.Red, center, 6, radius);
            polygon.draw(htmlCanvas);
    
            const buffer = canvas.toBuffer('image/png');
            expect(buffer).toMatchImageSnapshot({
                customSnapshotIdentifier: "red-hexagon-snapshot",
                failureThreshold: 0.02,
                failureThresholdType: "percent"
            });
        });
    });
});