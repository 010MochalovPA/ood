import {
    CircleOptions,
    LineOptions,
    RectangleOptions,
    ShapeType,
    TextOptions,
    TriangleOptions,
    SpecificShapeOptions,
} from '../types';

function validateId(id: string): string {
    if (!id || typeof id !== 'string') {
        throw new Error("ID фигуры должен быть непустой строкой.");
    }

    return id;
}

function validateNumber(value: string): number {
    const num = Number(value);

    if (isNaN(num)) {
        throw new Error("Значение должно быть числом.");
    }

    return num;
}

function validateColor(color: string): string {
    if (!/^#[0-9A-F]{6}$/i.test(color)) {
        throw new Error("Неверный формат цвета. Ожидается HEX цвет (например #FFFFFF).");
    }
    
    return color;
}

function validateShapeType(type: string): ShapeType {
    if (!Object.values(ShapeType).includes(type as ShapeType)) {
        throw new Error("Неверный тип фигуры.");
    }

    return type as ShapeType;
}

function validateRectangleOptions(options: string[]): RectangleOptions {
    const [x, y, width, height] = options.map(Number);

    if (options.length !== 4 || isNaN(x) || isNaN(y) || isNaN(width) || isNaN(height)) {
        throw new Error("Неверные аргументы для прямоугольника. Ожидаются: <x> <y> <width> <height>.");
    }

    if (width <= 0 || height <= 0) {
        throw new Error("Ширина и высота прямоугольника должны быть положительными числами.");
    }

    return {
        point: { x, y },
        size: { width, height },
    };
}

function validateCircleOptions(options: string[]): CircleOptions {
    const [x, y, radius] = options.map(Number);

    if (options.length !== 3 || isNaN(x) || isNaN(y) || isNaN(radius)) {
        throw new Error("Неверные аргументы для круга. Ожидаются: <x> <y> <radius>.");
    }

    if (radius <= 0) {
        throw new Error("Радиус круга должен быть положительным числом.");
    }

    return {
        point: { x, y },
        radius,
    };
}

function validateTriangleOptions(options: string[]): TriangleOptions {
    const [x1, y1, x2, y2, x3, y3] = options.map(Number);

    if (options.length !== 6 || [x1, y1, x2, y2, x3, y3].some(isNaN)) {
        throw new Error("Неверные аргументы для треугольника. Ожидаются: <x1> <y1> <x2> <y2> <x3> <y3>.");
    }

    return {
        point1: { x: x1, y: y1 },
        point2: { x: x2, y: y2 },
        point3: { x: x3, y: y3 },
    };
}

function validateLineOptions(options: string[]): LineOptions {
    const [x1, y1, x2, y2] = options.map(Number);

    if (options.length !== 4 || isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
        throw new Error("Неверные аргументы для линии. Ожидаются: <x1> <y1> <x2> <y2>.");
    }

    return {
        point1: { x: x1, y: y1 },
        point2: { x: x2, y: y2 },
    };
}

function validateTextOptions(options: string[]): TextOptions {
    const [x, y, fontSize, ...dataParts] = options;
    const data = dataParts.join(" ");

    if (options.length < 3 || isNaN(Number(x)) || isNaN(Number(y)) || isNaN(Number(fontSize))) {
        throw new Error("Неверные аргументы для текста. Ожидаются: <x> <y> <size> <text>.");
    }

    if (Number(fontSize) <= 0) {
        throw new Error("Размер текста должен быть положительным числом.");
    }

    if (!data) {
        throw new Error("Текстовое содержимое не может быть пустым.");
    }

    return {
        point: { x: Number(x), y: Number(y) },
        fontSize: Number(fontSize),
        data,
    };
}

function validateOptions(type: ShapeType, options: string[]): SpecificShapeOptions {
    switch (type) {
        case ShapeType.RECTANGLE:
            return validateRectangleOptions(options);

        case ShapeType.CIRCLE:
            return validateCircleOptions(options);

        case ShapeType.TRIANGLE:
            return validateTriangleOptions(options);

        case ShapeType.LINE:
            return validateLineOptions(options);

        case ShapeType.TEXT:
            return validateTextOptions(options);

        default:
            throw new Error(`Неизвестный тип фигуры: ${type}`);
    }
}

export {
    validateShapeType,
    validateColor,
    validateId,
    validateOptions,
    validateNumber,
}
