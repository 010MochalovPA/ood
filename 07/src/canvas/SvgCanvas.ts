import type { ICanvas, IFrame } from '../types';

class SvgCanvas implements ICanvas {
    private elements: string[] = [];

    drawLine(x1: number, y1: number, x2: number, y2: number): void {
        this.elements.push(
            `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${this.currentLineColor}" stroke-width="${this.currentLineThickness}" />`
        );
    }

    drawEllipse(frame: IFrame): void {
        const cx = frame.x + frame.width / 2;
        const cy = frame.y + frame.height / 2;
        const rx = frame.width / 2;
        const ry = frame.height / 2;
        
        this.elements.push(
            `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${this.currentLineColor}" stroke-width="${this.currentLineThickness}" />`
        );
    }

    fillEllipse(frame: IFrame): void {
        const cx = frame.x + frame.width / 2;
        const cy = frame.y + frame.height / 2;
        const rx = frame.width / 2;
        const ry = frame.height / 2;

        this.elements.push(
            `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${this.currentFillColor}" stroke="none" />`
        );
    }

    fillPolygon(points: { x: number; y: number }[]): void {
        const pointsStr = points.map((p) => `${p.x},${p.y}`).join(' ');
        this.elements.push(
            `<polygon points="${pointsStr}" fill="${this.currentFillColor}" stroke="none" />`
        );
    }

    private currentFillColor = 'black';
    private currentLineColor = 'black';
    private currentLineThickness = 1;

    setFillColor(color: string): void {
        this.currentFillColor = color;
    }

    setLineColor(color: string): void {
        this.currentLineColor = color;
    }

    setLineThickness(thickness: number): void {
        this.currentLineThickness = thickness;
    }

    toSvg(width: number, height: number): string {
        return `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
${this.elements.join('\n')}
</svg>`;
    }
}

export {
    SvgCanvas,
};