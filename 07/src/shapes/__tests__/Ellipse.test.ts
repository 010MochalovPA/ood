import { Ellipse } from '../Ellipse';
import { MockCanvas } from '../../canvas/MockCanvas';
import type { IFrame, ILineStyle, IFillStyle } from '../../types';

describe('Ellipse', () => {
    let canvas: MockCanvas;
    let setFillColorSpy: jest.SpyInstance;
    let fillEllipseSpy: jest.SpyInstance;
    let setLineColorSpy: jest.SpyInstance;
    let drawEllipseSpy: jest.SpyInstance;

    const defaultFrame: IFrame = { x: 10, y: 10, width: 50, height: 30 };
    const defaultLineStyle: ILineStyle = { enabled: true, color: 'rgba(0,0,255,1)', thickness: 2 };
    const defaultFillStyle: IFillStyle = { enabled: true, color: 'rgba(0,255,0,1)' };

    beforeEach(() => {
        canvas = new MockCanvas();
        setFillColorSpy = jest.spyOn(canvas, 'setFillColor');
        fillEllipseSpy = jest.spyOn(canvas, 'fillEllipse');
        setLineColorSpy = jest.spyOn(canvas, 'setLineColor');
        drawEllipseSpy = jest.spyOn(canvas, 'drawEllipse');

        // Очищаем историю вызовов перед каждым тестом
        setFillColorSpy.mockClear();
        fillEllipseSpy.mockClear();
        setLineColorSpy.mockClear();
        drawEllipseSpy.mockClear();
    });

    test('должен иметь корректный начальный фрейм', () => {
        const ellipse = new Ellipse(defaultFrame, defaultLineStyle, defaultFillStyle);
        expect(ellipse.getFrame()).toEqual(defaultFrame);
    });

    test('должен рисовать заливку и обводку, если они включены', () => {
        const ellipse = new Ellipse(defaultFrame, defaultLineStyle, defaultFillStyle);
        ellipse.draw(canvas);

        expect(setFillColorSpy).toHaveBeenCalledWith('rgba(0,255,0,1)');
        expect(fillEllipseSpy).toHaveBeenCalledWith(defaultFrame);
        expect(setLineColorSpy).toHaveBeenCalledWith('rgba(0,0,255,1)');
        expect(drawEllipseSpy).toHaveBeenCalledWith(defaultFrame);
    });

    test('не должен рисовать обводку, если она отключена', () => {
        const lineStyle: ILineStyle = { enabled: false, color: 'rgba(0,0,255,1)', thickness: 2 };
        const ellipse = new Ellipse(defaultFrame, lineStyle, defaultFillStyle);

        ellipse.draw(canvas);

        expect(drawEllipseSpy).not.toHaveBeenCalled();
    });

    test('должен создавать независимую копию при клонировании', () => {
        const ellipse = new Ellipse(defaultFrame, defaultLineStyle, defaultFillStyle);
        const clone = ellipse.clone() as Ellipse;

        expect(clone).not.toBe(ellipse);

        clone.setFrame({ x: 99, y: 99, width: 99, height: 99 });
        expect(ellipse.getFrame().x).toBe(10);
    });
});