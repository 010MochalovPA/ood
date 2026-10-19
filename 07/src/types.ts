interface IFrame {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface IFillStyle {
    enabled: boolean;
    color: string;
}

interface ILineStyle {
    enabled: boolean;
    color: string;
    thickness: number;
}

interface Point {
    x: number;
    y: number;
}

interface IDrawContext {
    hideFrame: boolean;
}

interface ICanvas {
    drawLine(x1: number, y1: number, x2: number, y2: number): void;
    drawEllipse(frame: IFrame): void;
    fillEllipse(frame: IFrame): void;
    fillPolygon(points: Point[]): void;
    setFillColor(color: string): void;
    setLineColor(color: string): void;
    setLineThickness(thickness: number): void;
}

interface IShape {
    getFrame(): IFrame;
    setFrame(frame: IFrame): void;

    getLineStyle(): ILineStyle | undefined;
    setLineStyle(style: Partial<ILineStyle>): void;

    getFillStyle(): IFillStyle | undefined;
    setFillStyle(style: Partial<IFillStyle>): void;

    draw(canvas: ICanvas, context?: IDrawContext): void;

    clone(): IShape;
}

export type {
    IFrame,
    IFillStyle,
    ILineStyle,
    Point,
    ICanvas,
    IShape,
    IDrawContext,
};