interface ICanvas {
    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;

    setColor(rgbColor: number): void;
}

export {
    ICanvas,
}