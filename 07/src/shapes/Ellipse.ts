import type { IFrame, ILineStyle, IFillStyle, ICanvas, IDrawContext, IShape } from '../types';
import { Shape } from './Shape';

class Ellipse extends Shape implements IShape {
    constructor(frame: IFrame, lineStyle: ILineStyle, fillStyle: IFillStyle) {
        super(frame, lineStyle, fillStyle);
    }

    draw(canvas: ICanvas, context?: IDrawContext): void {
        const frame = this.getFrame();
        const lineStyle = this.getLineStyle();
        const fillStyle = this.getFillStyle();

        if (fillStyle?.enabled) {
            canvas.setFillColor(fillStyle.color);
            canvas.fillEllipse(frame);
        }

        if (lineStyle?.enabled) {
            canvas.setLineColor(lineStyle.color);
            canvas.setLineThickness(lineStyle.thickness);
            canvas.drawEllipse(frame);
        }

        if (!context?.hideFrame) {
            this.drawFrame(canvas, frame);
        }
    }

    clone(): IShape {
        return new Ellipse(
            this.getFrame(),
            this.getLineStyle()!,
            this.getFillStyle()!
        );
    }
}

export {
    Ellipse,
};