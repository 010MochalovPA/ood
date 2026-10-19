import type { IFrame, ILineStyle, IFillStyle, ICanvas, IDrawContext, IShape } from '../types';
import { Shape } from './Shape';

class Rectangle extends Shape implements IShape {
    constructor(frame: IFrame, lineStyle: ILineStyle, fillStyle: IFillStyle) {
        super(frame, lineStyle, fillStyle);
    }

    draw(canvas: ICanvas, context?: IDrawContext): void {
        const frame = this.getFrame();
        const lineStyle = this.getLineStyle();
        const fillStyle = this.getFillStyle();

        if (fillStyle?.enabled) {
            canvas.setFillColor(fillStyle.color);
            canvas.fillPolygon([
                { x: frame.x, y: frame.y },
                { x: frame.x + frame.width, y: frame.y },
                { x: frame.x + frame.width, y: frame.y + frame.height },
                { x: frame.x, y: frame.y + frame.height },
            ]);
        }

        if (lineStyle?.enabled) {
            canvas.setLineColor(lineStyle.color);
            canvas.setLineThickness(lineStyle.thickness);
            canvas.drawLine(frame.x, frame.y, frame.x + frame.width, frame.y);
            canvas.drawLine(frame.x + frame.width, frame.y, frame.x + frame.width, frame.y + frame.height);
            canvas.drawLine(frame.x + frame.width, frame.y + frame.height, frame.x, frame.y + frame.height);
            canvas.drawLine(frame.x, frame.y + frame.height, frame.x, frame.y);
        }

        if (!context?.hideFrame) {
            this.drawFrame(canvas, frame);
        }
    }

    clone(): IShape {
        return new Rectangle(
            this.getFrame(),
            this.getLineStyle()!,
            this.getFillStyle()!
        );
    }
}

export {
    Rectangle,
};