import type { IFrame, ILineStyle, IFillStyle, ICanvas, IShape, IDrawContext } from '../types';
import { Shape } from './Shape';

class ShapeGroup extends Shape {
    private shapes: IShape[];

    constructor() {
        const frame: IFrame = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };
        const lineStyle: ILineStyle = {
            enabled: true,
            color: 'rgba(0,0,0,1)',
            thickness: 1,
        };
        const fillStyle: IFillStyle = {
            enabled: true,
            color: 'rgba(255,255,255,1)',
        };

        super(frame, lineStyle, fillStyle);
        this.shapes = [];
    }

    add(shape: IShape): void {
        this.shapes.push(shape);
    }

    remove(shape: IShape): void {
        const index = this.shapes.indexOf(shape);
        if (index !== -1) {
            this.shapes.splice(index, 1);
        }
    }

    getFrame(): IFrame {
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        let hasVisibleShapes = false;

        for (const shape of this.shapes) {
            const frame = shape.getFrame();
            
            if (frame.width === 0 && frame.height === 0) {
                continue;
            }

            hasVisibleShapes = true;
            minX = Math.min(minX, frame.x);
            minY = Math.min(minY, frame.y);
            maxX = Math.max(maxX, frame.x + frame.width);
            maxY = Math.max(maxY, frame.y + frame.height);
        }

        if (!hasVisibleShapes) {
            return {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            };
        }

        return {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY,
        };
    }

    setFrame(frame: IFrame): void {
        const oldFrame = this.getFrame();
        
        if (oldFrame.width === 0 || oldFrame.height === 0) {
            super.setFrame(frame);
            return;
        }

        const scaleX = frame.width / oldFrame.width;
        const scaleY = frame.height / oldFrame.height;

        for (const shape of this.shapes) {
            const childFrame = shape.getFrame();
            
            const newFrame: IFrame = {
                x: frame.x + (childFrame.x - oldFrame.x) * scaleX,
                y: frame.y + (childFrame.y - oldFrame.y) * scaleY,
                width: childFrame.width * scaleX,
                height: childFrame.height * scaleY,
            };
            
            shape.setFrame(newFrame);
        }

        super.setFrame(frame);
    }

    getLineStyle(): ILineStyle | undefined {
        if (this.shapes.length === 0) {
            return super.getLineStyle();
        }

        const firstStyle = this.shapes[0].getLineStyle();
        if (!firstStyle) {
            return undefined;
        }

        for (let i = 1; i < this.shapes.length; i++) {
            const style = this.shapes[i].getLineStyle();
            if (
                !style ||
                style.enabled !== firstStyle.enabled ||
                style.color !== firstStyle.color ||
                style.thickness !== firstStyle.thickness
            ) {
                return super.getLineStyle();
            }
        }

        return firstStyle;
    }

    setLineStyle(style: Partial<ILineStyle>): void {
        super.setLineStyle(style);
        for (const shape of this.shapes) {
            shape.setLineStyle(style);
        }
    }

    getFillStyle(): IFillStyle | undefined {
        if (this.shapes.length === 0) {
            return super.getFillStyle();
        }

        const firstStyle = this.shapes[0].getFillStyle();
        if (!firstStyle) {
            return undefined;
        }

        for (let i = 1; i < this.shapes.length; i++) {
            const style = this.shapes[i].getFillStyle();
            if (
                !style ||
                style.enabled !== firstStyle.enabled ||
                style.color !== firstStyle.color
            ) {
                return super.getFillStyle();
            }
        }

        return firstStyle;
    }

    setFillStyle(style: Partial<IFillStyle>): void {
        super.setFillStyle(style);
        for (const shape of this.shapes) {
            shape.setFillStyle(style);
        }
    }

    draw(canvas: ICanvas, context?: IDrawContext): void {
        if (!context?.hideFrame) {
            this.drawFrame(canvas, this.getFrame());
        }

        const childContext: IDrawContext = { hideFrame: true };
        for (const shape of this.shapes) {
            shape.draw(canvas, childContext);
        }
    }

    clone(): IShape {
        const newGroup = new ShapeGroup();
        
        for (const shape of this.shapes) {
            newGroup.add(shape.clone());
        }

        const lineStyle = this.getLineStyle();
        const fillStyle = this.getFillStyle();
        
        if (lineStyle) {
            super.setLineStyle(lineStyle);
        }
        
        if (fillStyle) {
            super.setFillStyle(fillStyle);
        }
        
        return newGroup;
    }
}

export {
    ShapeGroup,
};