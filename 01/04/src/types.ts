enum ShapeType {
    RECTANGLE = 'rectangle',
    CIRCLE = "circle",
    TRIANGLE = "triangle",
    LINE = "line",
    TEXT = "text",
}

type Point = {
    x: number,
    y: number
}

type Size = {
    width: number,
    height: number
}

type ShapeBaseOptions = {
    id: string,
    type: ShapeType,
    color: string,
}

type RectangleOptions = {
    point: Point,
    size: Size,
}

type CircleOptions = {
    point: Point,
    radius: number,
}

type TriangleOptions = {
    point1: Point,
    point2: Point,
    point3: Point,
}

type LineOptions = {
    point1: Point,
    point2: Point,
}

type TextOptions = {
    point: Point,
    fontSize: number,
    data: string,
}

type SpecificShapeOptions = LineOptions
    | CircleOptions
    | RectangleOptions
    | TriangleOptions
    | TextOptions;

type ShapeOptions<T> = ShapeBaseOptions & T;

type DetailedShapeOptions = ShapeOptions<TextOptions>
    | ShapeOptions<LineOptions>
    | ShapeOptions<TriangleOptions>
    | ShapeOptions<CircleOptions>
    | ShapeOptions<RectangleOptions>;


type MoveShapeArguments = {
    id: string,
    dx: number,
    dy: number,
}

type IdArguments = {
    id: string,
}

type MoveArguments = {
    dx: number,
    dy: number,
}

type ChangeColorArguments = {
    id: string,
    color: string,
}

export type {
    Point,
    Size,
    RectangleOptions,
    CircleOptions,
    TriangleOptions,
    LineOptions,
    TextOptions,
    ShapeOptions,
    SpecificShapeOptions,
    DetailedShapeOptions,
    MoveShapeArguments,
    MoveArguments,
    IdArguments,
    ChangeColorArguments,
}

export {
    ShapeType,
}