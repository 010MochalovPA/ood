import { ICanvas } from '../graphics_lib/ICanvas';
import { ModernGraphicsRenderer } from '../modern_graphics_lib/ModernGraphicsRenderer';
import { Point } from '../modern_graphics_lib/Point';
import { RGBAColor } from '../modern_graphics_lib/RGBAColor';

class ModernCanvasAdapter implements ICanvas {
    private currentPoint: Point | null = null;
    private isDrawingStarted = false;

    private currentRgbColor: number = 0x000000;

    constructor(private readonly renderer: ModernGraphicsRenderer) { }

    setColor(rgbColor: number): void {
        this.currentRgbColor = rgbColor;
    }

    moveTo(x: number, y: number): void {
        if (!this.isDrawingStarted) {
            this.renderer.beginDraw();
            this.isDrawingStarted = true;
        }

        this.currentPoint = new Point(x, y);
    }

    lineTo(x: number, y: number): void {
        if (!this.currentPoint) {
            throw new Error('Метод moveTo должен быть вызван перед методом lineTo');
        }

        const endPoint = new Point(x, y);
        const color = this.convertRgbToRgba(this.currentRgbColor);

        this.renderer.drawLine(this.currentPoint, endPoint, color);

        this.currentPoint = endPoint;
    }

    endDraw(): void {
        if (this.isDrawingStarted) {
            this.renderer.endDraw();
            this.isDrawingStarted = false;
            this.currentPoint = null;
        }
    }

    private convertRgbToRgba(rgb: number): RGBAColor {
        const r = ((rgb >> 16) & 0xFF) / 255;
        const g = ((rgb >> 8) & 0xFF) / 255;
        const b = (rgb & 0xFF) / 255;

        return new RGBAColor(r, g, b, 1.0);
    }
}

export {
    ModernCanvasAdapter,
}