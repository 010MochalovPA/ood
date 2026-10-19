import { Rectangle } from '../Rectangle';
import { MockCanvas } from '../../canvas/MockCanvas';
import type { IFrame, ILineStyle, IFillStyle } from '../../types';

describe('Rectangle', () => {
    let canvas: MockCanvas;
    let setFillColorSpy: jest.SpyInstance;
    let fillPolygonSpy: jest.SpyInstance;
    let setLineColorSpy: jest.SpyInstance;
    let setLineThicknessSpy: jest.SpyInstance;

    const defaultFrame: IFrame = { x: 10, y: 10, width: 50, height: 50 };
    const defaultLineStyle: ILineStyle = { enabled: true, color: 'rgba(0,0,0,1)', thickness: 1 };
    const defaultFillStyle: IFillStyle = { enabled: true, color: 'rgba(255,0,0,1)' };

    beforeEach(() => {
        canvas = new MockCanvas();
        setFillColorSpy = jest.spyOn(canvas, 'setFillColor');
        fillPolygonSpy = jest.spyOn(canvas, 'fillPolygon');
        setLineColorSpy = jest.spyOn(canvas, 'setLineColor');
        setLineThicknessSpy = jest.spyOn(canvas, 'setLineThickness');

        setFillColorSpy.mockClear();
        fillPolygonSpy.mockClear();
        setLineColorSpy.mockClear();
        setLineThicknessSpy.mockClear();
    });

    test('должен иметь корректный начальный фрейм', () => {
        const rect = new Rectangle(defaultFrame, defaultLineStyle, defaultFillStyle);
        expect(rect.getFrame()).toEqual(defaultFrame);
    });

    test('должен обновлять фрейм', () => {
        const rect = new Rectangle(defaultFrame, defaultLineStyle, defaultFillStyle);
        const newFrame: IFrame = { x: 0, y: 0, width: 100, height: 100 };
        rect.setFrame(newFrame);
        expect(rect.getFrame()).toEqual(newFrame);
    });

    test('должен рисовать заливку и обводку, если они включены', () => {
        const rect = new Rectangle(defaultFrame, defaultLineStyle, defaultFillStyle);
        rect.draw(canvas);

        expect(setFillColorSpy).toHaveBeenCalledWith('rgba(255,0,0,1)');
        expect(fillPolygonSpy).toHaveBeenCalled();
        expect(setLineColorSpy).toHaveBeenCalledWith('rgba(0,0,0,1)');
        expect(setLineThicknessSpy).toHaveBeenCalledWith(1);
    });

    test('не должен рисовать заливку, если она отключена', () => {
        const fillStyle: IFillStyle = { enabled: false, color: 'rgba(255,0,0,1)' };
        const rect = new Rectangle(defaultFrame, defaultLineStyle, fillStyle);
        
        rect.draw(canvas);

        expect(fillPolygonSpy).not.toHaveBeenCalled();
    });

    test('должен частично обновлять стиль обводки', () => {
        const rect = new Rectangle(defaultFrame, defaultLineStyle, defaultFillStyle);
        rect.setLineStyle({ thickness: 5 });
        
        const style = rect.getLineStyle();
        expect(style?.thickness).toBe(5);
        expect(style?.color).toBe('rgba(0,0,0,1)');
    });

    test('должен создавать независимую копию при клонировании', () => {
        const rect = new Rectangle(defaultFrame, defaultLineStyle, defaultFillStyle);
        const clone = rect.clone() as Rectangle;

        expect(clone).not.toBe(rect);
        expect(clone.getFrame()).toEqual(defaultFrame);

        clone.setFrame({ x: 99, y: 99, width: 99, height: 99 });
        expect(rect.getFrame().x).toBe(10);
    });
});