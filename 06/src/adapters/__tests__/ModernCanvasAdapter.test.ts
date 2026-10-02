import { ModernCanvasAdapter } from '../ModernCanvasAdapter';
import { ModernGraphicsRenderer } from '../../modern_graphics_lib/ModernGraphicsRenderer';
import type { IOutputStream } from '../../modern_graphics_lib/IOutputStream';

describe('ModernCanvasAdapter', () => {
    let mockStream: jest.Mocked<IOutputStream>;
    let renderer: ModernGraphicsRenderer;
    let adapter: ModernCanvasAdapter;

    beforeEach(() => {
        mockStream = {
            writeLine: jest.fn(),
        };

        renderer = new ModernGraphicsRenderer(mockStream);
        adapter = new ModernCanvasAdapter(renderer);
    });

    test('Инициализация рисования при первом перемещении', () => {
        adapter.moveTo(10, 20);

        expect(mockStream.writeLine).toHaveBeenCalledWith('<draw>');
    });

    test('Защита от повторной инициализации beginDraw', () => {
        adapter.moveTo(10, 20);
        adapter.moveTo(30, 40);

        const drawCalls = mockStream.writeLine.mock.calls.filter(call => call[0] === '<draw>');
        expect(drawCalls.length).toBe(1);
    });

    test('Преобразование координат в линию с объектами ModernPoint', () => {
        adapter.moveTo(0, 0);
        adapter.lineTo(100, 50);

        expect(mockStream.writeLine).toHaveBeenCalledWith(
            '  <line fromX="0" fromY="0" toX="100" toY="50">'
        );
    });

    test('Обновление позиции «пера» после рисования линии', () => {
        adapter.moveTo(10, 10);
        adapter.lineTo(20, 20);
        adapter.lineTo(30, 30);

        expect(mockStream.writeLine).toHaveBeenNthCalledWith(
            5,
            '  <line fromX="20" fromY="20" toX="30" toY="30">'
        );
    });

    test('Обработка ошибки при вызове lineTo без предварительного moveTo', () => {
        expect(() => adapter.lineTo(10, 10)).toThrow('Метод moveTo должен быть вызван перед методом lineTo');
    });

    test('Корректное завершение сессии рисования и закрытие тега', () => {
        adapter.moveTo(1, 1);
        adapter.endDraw();

        expect(mockStream.writeLine).toHaveBeenCalledWith('</draw>');
    });

    test('Поддержка множественных независимых сессий рисования', () => {
        adapter.moveTo(1, 1);
        adapter.endDraw();

        mockStream.writeLine.mockClear();

        adapter.moveTo(5, 5);
        adapter.endDraw();

        expect(mockStream.writeLine).toHaveBeenCalledWith('<draw>');
        expect(mockStream.writeLine).toHaveBeenCalledWith('</draw>');
    });

    test('Конвертация черного цвета (0x000000) в RGBA', () => {
        adapter.setColor(0x000000);
        adapter.moveTo(0, 0);
        adapter.lineTo(10, 10);

        expect(mockStream.writeLine).toHaveBeenCalledWith('    <color r="0" g="0" b="0" a="1" />');
    });

    test('Конвертация белого цвета (0xFFFFFF) в RGBA', () => {
        adapter.setColor(0xFFFFFF);
        adapter.moveTo(0, 0);
        adapter.lineTo(10, 10);

        expect(mockStream.writeLine).toHaveBeenCalledWith(expect.stringContaining('r="1"'));
        expect(mockStream.writeLine).toHaveBeenCalledWith(expect.stringContaining('g="1"'));
        expect(mockStream.writeLine).toHaveBeenCalledWith(expect.stringContaining('b="1"'));
    });

    test('Конвертация чистого красного цвета (0xFF0000) в RGBA', () => {
        adapter.setColor(0xFF0000);
        adapter.moveTo(0, 0);
        adapter.lineTo(10, 10);

        expect(mockStream.writeLine).toHaveBeenCalledWith('    <color r="1" g="0" b="0" a="1" />');
    });

    test('Конвертация произвольного цвета (0x804020) в RGBA', () => {
        adapter.setColor(0x804020);
        adapter.moveTo(0, 0);
        adapter.lineTo(10, 10);

        expect(mockStream.writeLine).toHaveBeenCalledWith('    <color r="0.5019607843137255" g="0.25098039215686274" b="0.12549019607843137" a="1" />');
    });

    test('Использование последнего установленного цвета для нескольких линий', () => {
        adapter.setColor(0x00FF00);
        adapter.moveTo(0, 0);
        adapter.lineTo(10, 10);

        adapter.setColor(0x0000FF);
        adapter.lineTo(20, 20);

        const calls = mockStream.writeLine.mock.calls;
        const firstColorCall = calls.find(c => c[0].includes('g="1"'));
        const secondColorCall = calls.filter(c => c[0].includes('color')).pop();

        expect(firstColorCall?.[0]).toContain('b="0"');
        expect(secondColorCall?.[0]).toContain('b="1"');
    });

    test('Безопасное игнорирование завершения несуществующей сессии', () => {
        expect(() => adapter.endDraw()).not.toThrow();

        expect(mockStream.writeLine).not.toHaveBeenCalled();
    });

    test('Безопасное игнорирование повторного завершения сессии', () => {
        adapter.moveTo(1, 1);
        adapter.endDraw();

        expect(() => adapter.endDraw()).not.toThrow();

        const endDrawCalls = mockStream.writeLine.mock.calls.filter(call => call[0] === '</draw>');
        expect(endDrawCalls.length).toBe(1);
    });
});