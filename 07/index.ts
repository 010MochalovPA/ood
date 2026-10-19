import * as fs from 'fs';
import { SvgCanvas } from './src/canvas/SvgCanvas';
import { Rectangle } from './src/shapes/Rectangle';
import { Ellipse } from './src/shapes/Ellipse';
import { ShapeGroup } from './src/shapes/ShapeGroup';
import type { ILineStyle, IFillStyle } from './src/types';

const canvas = new SvgCanvas();

const noLine: ILineStyle = { enabled: false, color: '', thickness: 0 };
const wallFill: IFillStyle = { enabled: true, color: 'rgba(173, 216, 230, 1)' };
const roofLeftFill: IFillStyle = { enabled: true, color: 'rgba(250, 128, 114, 1)' };
const roofRightFill: IFillStyle = { enabled: true, color: 'rgba(255, 215, 0, 1)' };

const walls = new Rectangle(
    { x: 50, y: 100, width: 100, height: 100 },
    noLine,
    wallFill
);

const roofPart1 = new Rectangle(
    { x: 40, y: 80, width: 60, height: 20 },
    noLine,
    roofLeftFill
);

const roofPart2 = new Rectangle(
    { x: 100, y: 80, width: 60, height: 20 },
    noLine,
    roofRightFill
);

const roofGroup = new ShapeGroup();
roofGroup.add(roofPart1);
roofGroup.add(roofPart2);

const houseGroup = new ShapeGroup();
houseGroup.add(walls);
houseGroup.add(roofGroup);

const outerCircle = new Ellipse(
    { x: 250, y: 100, width: 50, height: 50 },
    noLine,
    wallFill
);

const roofClone = roofGroup.clone() as ShapeGroup;

const cloneFrame = roofClone.getFrame();
roofClone.setFrame({
    x: cloneFrame.x + 120,
    y: cloneFrame.y + 120,
    width: cloneFrame.width + 120,
    height: cloneFrame.height + 20,
});

houseGroup.draw(canvas);
outerCircle.draw(canvas);
roofClone.draw(canvas);

const svgContent = canvas.toSvg(400, 300);
fs.writeFileSync('slide.svg', svgContent);

console.log('Done. Check slide.svg');