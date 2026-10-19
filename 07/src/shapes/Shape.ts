import type {
    IFrame,
    IFillStyle,
    ILineStyle,
    ICanvas,
    IShape,
    IDrawContext,
} from '../types';

abstract class Shape implements IShape {
    private frame: IFrame;
    private lineStyle: ILineStyle;
    private fillStyle: IFillStyle;

    constructor(frame: IFrame, lineStyle: ILineStyle, fillStyle: IFillStyle) {
        this.frame = {
            ...frame,
        };
        this.lineStyle = {
            ...lineStyle,
        };
        this.fillStyle = {
            ...fillStyle,
        };
    }

    getFrame(): IFrame {
        return {
            ...this.frame,
        };
    }

    setFrame(frame: IFrame): void {
        this.frame = {
            ...frame,
        };
    }

    getLineStyle(): ILineStyle | undefined {
        return {
            ...this.lineStyle,
        };
    }

    setLineStyle(style: Partial<ILineStyle>): void {
        if (style.enabled !== undefined) {
            this.lineStyle.enabled = style.enabled;
        }
        if (style.color !== undefined) {
            this.lineStyle.color = style.color;
        }
        if (style.thickness !== undefined) {
            this.lineStyle.thickness = style.thickness;
        }
    }

    getFillStyle(): IFillStyle | undefined {
        return {
            ...this.fillStyle,
        };
    }

    setFillStyle(style: Partial<IFillStyle>): void {
        if (style.enabled !== undefined) {
            this.fillStyle.enabled = style.enabled;
        }
        if (style.color !== undefined) {
            this.fillStyle.color = style.color;
        }
    }

    protected drawFrame(canvas: ICanvas, frame: IFrame): void {
        canvas.setLineColor('rgba(0,0,255,0.5)');
        canvas.setLineThickness(1);
        
        const offset = 2;
        const x1 = frame.x - offset;
        const y1 = frame.y - offset;
        const x2 = frame.x + frame.width + offset;
        const y2 = frame.y + frame.height + offset;

        canvas.drawLine(x1, y1, x2, y1);
        canvas.drawLine(x2, y1, x2, y2);
        canvas.drawLine(x2, y2, x1, y2);
        canvas.drawLine(x1, y2, x1, y1);
    }

    abstract draw(canvas: ICanvas, context?: IDrawContext): void;    
    abstract clone(): IShape;
}

export {
    Shape,
};