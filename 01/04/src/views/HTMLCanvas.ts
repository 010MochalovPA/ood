import {ICanvas} from '../gfx/ICanvas';
import { Point, Size } from '../types';

class HTMLCanvas implements ICanvas {
    private _ctx: CanvasRenderingContext2D;

    constructor() {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this._ctx = canvas.getContext("2d");
        this._ctx.lineWidth = 2;
    }

    public setColor(color: string): void {
        this._ctx.strokeStyle = color;
        this._ctx.fillStyle = color;
    }

    public drawRectangle(point: Point, size: Size): void {
        this._ctx.rect(point.x, point.y, size.width, size.height);
        this._ctx.fill();
    }

    public drawCircle(point: Point, radius: number): void {
        this._ctx.beginPath();
        this._ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
        this._ctx.fill();
        this._ctx.closePath();
    }

    public drawTriangle(point1: Point, point2: Point, point3: Point): void {
        this._ctx.beginPath();
        this._ctx.moveTo(point1.x, point1.y);
        this._ctx.lineTo(point2.x, point2.y);
        this._ctx.lineTo(point3.x, point3.y);
        this._ctx.closePath();
        this._ctx.fill();
    }

    public drawLine(point1: Point, point2: Point): void {
        this._ctx.beginPath();
        this._ctx.moveTo(point1.x, point1.y);
        this._ctx.lineTo(point2.x, point2.y);
        this._ctx.stroke();
        this._ctx.closePath();
    }

    public drawText(point: Point, fontSize: number, data: string): void {
        this._ctx.font = `${fontSize}px Arial`;
        this._ctx.fillText(data, point.x, point.y);
    }
}

export { HTMLCanvas };