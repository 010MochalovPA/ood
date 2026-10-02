import { IOutputStream } from "./IOutputStream";
import { Point } from "./Point";
import { RGBAColor } from "./RGBAColor";

class ModernGraphicsRenderer {
    private isDrawing = false;

    constructor(private out: IOutputStream) { }

    beginDraw(): void {
        if (this.isDrawing) {
            throw new Error('Рисование уже начато');
        }

        this.out.writeLine('<draw>');
        this.isDrawing = true;
    }

    drawLine(start: Point, end: Point, color: RGBAColor): void {
        if (!this.isDrawing) {
            throw new Error('Call beginDraw first');
        }

        this.out.writeLine(`  <line fromX="${start.x}" fromY="${start.y}" toX="${end.x}" toY="${end.y}">`);
        this.out.writeLine(`    <color r="${color.r}" g="${color.g}" b="${color.b}" a="${color.a}" />`);
        this.out.writeLine(`  </line>`);
    }

    endDraw(): void {
        if (!this.isDrawing) {
            throw new Error('Рисование не было начато');
        }

        this.out.writeLine('</draw>');
        this.isDrawing = false;
    }
}

export {
    ModernGraphicsRenderer,
}