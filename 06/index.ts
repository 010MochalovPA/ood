import { Canvas } from './src/graphics_lib/Canvas';
import { CanvasPainter } from './src/shape_drawing_lib/CanvasPainter';
import { Rectangle } from './src/shape_drawing_lib/Rectangle';
import { Triangle } from './src/shape_drawing_lib/Triangle';
import { ModernGraphicsRenderer } from './src/modern_graphics_lib/ModernGraphicsRenderer';
import { ModernCanvasAdapter } from './src/adapters/ModernCanvasAdapter';

const canvas = new Canvas();
const painter1 = new CanvasPainter(canvas);

const triangle1 = new Triangle({ x: 10, y: 15 }, { x: 100, y: 200 }, { x: 150, y: 250 }, 0x0000FF);
const rectangle1 = new Rectangle({ x: 30, y: 40 }, 18, 24, 0x0000FF);

painter1.draw(triangle1);
painter1.draw(rectangle1);

const consoleStream = {
  writeLine: (text: string) => console.log(text),
};

const renderer2 = new ModernGraphicsRenderer(consoleStream);
const adapter2 = new ModernCanvasAdapter(renderer2);
const painter2 = new CanvasPainter(adapter2);

const triangle2 = new Triangle({ x: 10, y: 15 }, { x: 100, y: 200 }, { x: 150, y: 250 }, 0x0000FF);
const rectangle2 = new Rectangle({ x: 30, y: 40 }, 18, 24, 0x0000FF);

painter2.draw(triangle2);
painter2.draw(rectangle2);
adapter2.endDraw();