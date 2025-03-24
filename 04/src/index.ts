import { Client } from "./client/Client";
import { Designer } from "./designer/Designer";
import { ShapeFactory } from "./shapefactory/ShapeFactory";
import { Painter } from "./painter/Painter";

const shapeFactory = new ShapeFactory();
const designer = new Designer(shapeFactory);
const painter = new Painter();
const client = new Client(designer, painter);

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const input = document.getElementById('input') as HTMLTextAreaElement;
const draw = document.getElementById('draw') as HTMLButtonElement;

canvas.width = 1000;
canvas.height = 500;

draw.addEventListener('click', () => client.renderShapes(canvas, input.value));