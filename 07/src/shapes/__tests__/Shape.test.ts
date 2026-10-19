import { Rectangle } from '../Rectangle';
import type { IFrame, ILineStyle, IFillStyle } from '../../types';

describe('Shape (Base Logic)', () => {
    const defaultFrame: IFrame = { x: 0, y: 0, width: 10, height: 10 };
    const defaultLineStyle: ILineStyle = { enabled: true, color: 'black', thickness: 1 };
    const defaultFillStyle: IFillStyle = { enabled: true, color: 'white' };

    test('должен возвращать копию фрейма (immutability)', () => {
        const rect = new Rectangle(defaultFrame, defaultLineStyle, defaultFillStyle);
        const frame = rect.getFrame();
        frame.x = 999;
        expect(rect.getFrame().x).toBe(0);
    });

    test('должен корректно обновлять только цвет обводки', () => {
        const rect = new Rectangle(defaultFrame, defaultLineStyle, defaultFillStyle);
        rect.setLineStyle({ color: 'red' });
        
        const style = rect.getLineStyle();
        expect(style?.color).toBe('red');
        expect(style?.thickness).toBe(1); // Должно сохраниться
        expect(style?.enabled).toBe(true); // Должно сохраниться
    });

    test('должен корректно обновлять только толщину обводки', () => {
        const rect = new Rectangle(defaultFrame, defaultLineStyle, defaultFillStyle);
        rect.setLineStyle({ thickness: 10 });
        
        const style = rect.getLineStyle();
        expect(style?.thickness).toBe(10);
        expect(style?.color).toBe('black');
    });

    test('должен отключать обводку', () => {
        const rect = new Rectangle(defaultFrame, defaultLineStyle, defaultFillStyle);
        rect.setLineStyle({ enabled: false });
        
        const style = rect.getLineStyle();
        expect(style?.enabled).toBe(false);
    });

    test('должен корректно обновлять только цвет заливки', () => {
        const rect = new Rectangle(defaultFrame, defaultLineStyle, defaultFillStyle);
        rect.setFillStyle({ color: 'blue' });
        
        const style = rect.getFillStyle();
        expect(style?.color).toBe('blue');
        expect(style?.enabled).toBe(true);
    });

    test('должен отключать заливку', () => {
        const rect = new Rectangle(defaultFrame, defaultLineStyle, defaultFillStyle);
        rect.setFillStyle({ enabled: false });
        
        const style = rect.getFillStyle();
        expect(style?.enabled).toBe(false);
    });
});