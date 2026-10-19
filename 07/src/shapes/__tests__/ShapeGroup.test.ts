import { ShapeGroup } from '../ShapeGroup';
import { Rectangle } from '../Rectangle';
import { MockCanvas } from '../../canvas/MockCanvas';
import type { IFrame, ILineStyle, IFillStyle } from '../../types';

describe('ShapeGroup', () => {
    let group: ShapeGroup;
    let canvas: MockCanvas;

    const defaultLineStyle: ILineStyle = { enabled: true, color: 'black', thickness: 1 };
    const defaultFillStyle: IFillStyle = { enabled: true, color: 'white' };

    beforeEach(() => {
        group = new ShapeGroup();
        canvas = new MockCanvas();
    });

    test('должен иметь нулевой фрейм, если пуст', () => {
        expect(group.getFrame()).toEqual({
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        });
    });

    test('должен вычислять фрейм, охватывающий всех детей', () => {
        const rect1 = new Rectangle(
            { x: 10, y: 10, width: 20, height: 20 },
            defaultLineStyle,
            defaultFillStyle
        );
        const rect2 = new Rectangle(
            { x: 50, y: 50, width: 10, height: 10 },
            defaultLineStyle,
            defaultFillStyle
        );

        group.add(rect1);
        group.add(rect2);

        const frame = group.getFrame();
        expect(frame.x).toBe(10);
        expect(frame.y).toBe(10);
        expect(frame.width).toBe(50);
        expect(frame.height).toBe(50);
    });

    test('должен рисовать всех своих детей', () => {
        const rect = new Rectangle(
            { x: 0, y: 0, width: 10, height: 10 },
            defaultLineStyle,
            defaultFillStyle
        );
        const drawSpy = jest.spyOn(rect, 'draw');

        group.add(rect);
        
        const context = { hideFrame: false };
        group.draw(canvas, context);

        expect(drawSpy).toHaveBeenCalledWith(canvas, { hideFrame: true });
    });

    test('должен удалять фигуру из группы', () => {
        const rect = new Rectangle(
            { x: 0, y: 0, width: 10, height: 10 },
            defaultLineStyle,
            defaultFillStyle
        );

        group.add(rect);
        expect(group.getFrame().width).toBe(10);

        group.remove(rect);
        expect(group.getFrame().width).toBe(0);
    });

    test('должен корректно работать с вложенной пустой группой', () => {
        const rect = new Rectangle(
            { x: 10, y: 10, width: 20, height: 20 },
            defaultLineStyle,
            defaultFillStyle
        );
        const emptyGroup = new ShapeGroup();

        group.add(rect);
        group.add(emptyGroup);

        const frame = group.getFrame();
        expect(frame.x).toBe(10);
        expect(frame.y).toBe(10);
        expect(frame.width).toBe(20);
        expect(frame.height).toBe(20);
    });

    test('должен обновлять фрейм при изменении фрейма ребенка', () => {
        const rect = new Rectangle(
            { x: 0, y: 0, width: 10, height: 10 },
            defaultLineStyle,
            defaultFillStyle
        );

        group.add(rect);
        expect(group.getFrame().width).toBe(10);

        rect.setFrame({ x: 0, y: 0, width: 50, height: 50 });
        expect(group.getFrame().width).toBe(50);
    });

    test('должен масштабировать детей при изменении фрейма группы', () => {
        const rect = new Rectangle(
            { x: 10, y: 10, width: 20, height: 20 },
            defaultLineStyle,
            defaultFillStyle
        );

        group.add(rect);

        group.setFrame({ x: 10, y: 10, width: 40, height: 40 });

        const childFrame = rect.getFrame();
        expect(childFrame.width).toBe(40);
        expect(childFrame.height).toBe(40);
        expect(childFrame.x).toBe(10);
    });

    test('должен возвращать общий стиль, если у всех детей он одинаковый', () => {
        const rect1 = new Rectangle(
            { x: 0, y: 0, width: 10, height: 10 },
            defaultLineStyle,
            defaultFillStyle
        );
        const rect2 = new Rectangle(
            { x: 20, y: 20, width: 10, height: 10 },
            defaultLineStyle,
            defaultFillStyle
        );

        group.add(rect1);
        group.add(rect2);

        expect(group.getLineStyle()).toEqual(defaultLineStyle);
        expect(group.getFillStyle()).toEqual(defaultFillStyle);
    });

    test('должен возвращать стиль по умолчанию, если стили детей отличаются', () => {
        const differentLineStyle: ILineStyle = { enabled: true, color: 'red', thickness: 5 };

        const rect1 = new Rectangle(
            { x: 0, y: 0, width: 10, height: 10 },
            defaultLineStyle,
            defaultFillStyle
        );
        const rect2 = new Rectangle(
            { x: 20, y: 20, width: 10, height: 10 },
            differentLineStyle,
            defaultFillStyle
        );

        group.add(rect1);
        group.add(rect2);

        expect(group.getLineStyle()).not.toEqual(defaultLineStyle);
        expect(group.getLineStyle()?.color).toBe('rgba(0,0,0,1)');
    });

    test('должен применять стиль обводки ко всем детям', () => {
        const rect = new Rectangle(
            { x: 0, y: 0, width: 10, height: 10 },
            defaultLineStyle,
            defaultFillStyle
        );

        group.add(rect);
        group.setLineStyle({ color: 'purple' });

        expect(rect.getLineStyle()?.color).toBe('purple');
    });

    test('должен применять стиль заливки ко всем детям', () => {
        const rect = new Rectangle(
            { x: 0, y: 0, width: 10, height: 10 },
            defaultLineStyle,
            defaultFillStyle
        );

        group.add(rect);
        group.setFillStyle({ color: 'yellow' });

        expect(rect.getFillStyle()?.color).toBe('yellow');
    });

    test('должен возвращать undefined для стиля, если у первого ребенка его нет', () => {
        const rect = new Rectangle(
            { x: 0, y: 0, width: 10, height: 10 },
            defaultLineStyle,
            defaultFillStyle
        );

        jest.spyOn(rect, 'getLineStyle').mockReturnValue(undefined);

        group.add(rect);
        expect(group.getLineStyle()).toBeUndefined();
    });

    test('должен корректно обрабатывать масштабирование, если у группы нулевой размер', () => {
        const rect = new Rectangle(
            { x: 10, y: 10, width: 10, height: 10 },
            defaultLineStyle,
            defaultFillStyle
        );
        group.add(rect);

        const initialFrame = group.getFrame();
        expect(initialFrame.width).toBe(10);

        group.setFrame({ x: 0, y: 0, width: 20, height: 20 });

        const newFrame = rect.getFrame();
        expect(newFrame.width).toBe(20);
    });

    test('должен возвращать стиль по умолчанию, если у одного из детей отключена обводка', () => {
        const rect1 = new Rectangle(
            { x: 0, y: 0, width: 10, height: 10 },
            { enabled: true, color: 'black', thickness: 1 },
            defaultFillStyle
        );
        const rect2 = new Rectangle(
            { x: 20, y: 20, width: 10, height: 10 },
            { enabled: false, color: 'black', thickness: 1 },
            defaultFillStyle
        );

        group.add(rect1);
        group.add(rect2);

        const style = group.getLineStyle();
        expect(style?.enabled).toBe(true);
    });

    test('должен возвращать стиль по умолчанию, если у одного из детей отключена заливка', () => {
        const rect1 = new Rectangle(
            { x: 0, y: 0, width: 10, height: 10 },
            defaultLineStyle,
            { enabled: true, color: 'white' }
        );
        const rect2 = new Rectangle(
            { x: 20, y: 20, width: 10, height: 10 },
            defaultLineStyle,
            { enabled: false, color: 'white' }
        );

        group.add(rect1);
        group.add(rect2);

        const style = group.getFillStyle();
        expect(style?.enabled).toBe(true);
    });

    test('должен глубоко клонировать группу и всех её детей', () => {
        const rect = new Rectangle(
            { x: 0, y: 0, width: 10, height: 10 },
            defaultLineStyle,
            defaultFillStyle
        );

        group.add(rect);
        const clone = group.clone() as ShapeGroup;

        expect(clone).not.toBe(group);

        const originalChildFrame = rect.getFrame();
        const clonedChild = (clone as any).shapes[0];

        rect.setFrame({ x: 100, y: 100, width: 100, height: 100 });

        expect(clonedChild.getFrame().x).toBe(0);
    });
});