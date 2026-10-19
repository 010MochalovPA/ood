import type { ICanvas, IFrame } from '../types';

class MockCanvas implements ICanvas {
    drawLine(x1: number, y1: number, x2: number, y2: number): void {
        console.log(`Draw Line: (${x1}, ${y1}) -> (${x2}, ${y2})`);
    }

    drawEllipse(frame: IFrame): void {
        console.log(`Draw Ellipse: Frame(${frame.x}, ${frame.y}, ${frame.width}, ${frame.height})`);
    }

    fillEllipse(frame: IFrame): void {
        console.log(`Fill Ellipse: Frame(${frame.x}, ${frame.y}, ${frame.width}, ${frame.height})`);
    }

    fillPolygon(points: { x: number; y: number }[]): void {
        console.log(`Fill Polygon: Points count = ${points.length}`);
    }

    setFillColor(color: string): void {
        console.log(`Set Fill Color: ${color}`);
    }

    setLineColor(color: string): void {
        console.log(`Set Line Color: ${color}`);
    }

    setLineThickness(thickness: number): void {
        console.log(`Set Line Thickness: ${thickness}`);
    }
}

export {
    MockCanvas,
};