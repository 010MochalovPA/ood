import { Color } from "../common/Color";
import { colorToHex } from "../common/colortohex";
import { Point } from "../common/Point";
import { ICanvas } from "./ICanvas";

class HTMLCanvas implements ICanvas {
    #canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.#canvas = canvas;
        this.#getContext().lineWidth = 2;
    }

    #getContext(): CanvasRenderingContext2D {
        return HTMLCanvas.get2DContext(this.#canvas);
    }

    setColor(color: Color): void {
        const hexColor = colorToHex(color);
        const context = this.#getContext();

        [context.fillStyle, context.strokeStyle] = [hexColor, hexColor];
    }

    drawLine(from: Point, to: Point): void {
        const context = this.#getContext();

        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
		context.stroke();
    }

    drawElipse(center: Point, width: number, height: number): void {
        const context = this.#getContext();

        context.beginPath();
        context.ellipse(center.x, center.y, width / 2, height / 2, 0, 0, Math.PI * 2, false);
        context.closePath();
        context.stroke();
    }

    private static get2DContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
        const context = canvas.getContext("2d");
        if (!context) {
            throw new Error("Failed to get 2D rendering context.");
        }

        return context;
    }
}

export {
    HTMLCanvas,
};