import { ICanvas } from './ICanvas'

class Canvas implements ICanvas {
    moveTo(x: number, y: number): void {
        console.log(`moveTo (${x}, ${y})`);
    }

    lineTo(x: number, y: number): void {
        console.log(`lineTo (${x}, ${y})`);
    }

    setColor(rgbColor: number): void {
        const hex = rgbColor.toString(16).padStart(6, '0').toUpperCase();
        console.log(`setColor (#${hex})`);
    }
}

export {
    Canvas,
}