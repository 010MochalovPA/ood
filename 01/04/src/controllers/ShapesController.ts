import { ICanvas } from '../gfx/ICanvas';
import { Picture } from '../models/Picture';
import { ChangeColorArguments, ChangeShapeOptions, CircleOptions, DetailedChangeShapeOptions, DetailedShapeOptions, IdArguments, LineOptions, MoveArguments, MoveShapeArguments, RectangleOptions,  ShapeOptions,  ShapeType, TextOptions, TriangleOptions } from '../types';
import { remapChangeColorArguments, remapChangeShapeArguments, remapIdArguments, remapMoveArguments, remapMoveShapeArguments, remapShapeArguments } from '../utils/remapUtils';
import { Shape } from '../models/shapes/Shape';
import { RectangleShapeStrategy } from '../models/shapes/strategies/RectangleShapeStrategy';
import { LineShapeStrategy } from '../models/shapes/strategies/LineShapeStrategy';
import { TriangleShapeStrategy } from '../models/shapes/strategies/TriangleShapeStrategy';
import { CircleShapeStrategy } from '../models/shapes/strategies/CircleShapeStrategy';
import { TextShapeStrategy } from '../models/shapes/strategies/TextShapeStrategy';

enum Actions {
    ADD_SHAPE = 'addshape',
    DRAW_PICTURE = 'drawpicture',
    DRAW_SHAPE = 'drawshape',
    LIST = 'list',
    MOVE_PICTURE = 'movepicture',
    MOVE_SHAPE = 'moveshape',
    DELETE_SHAPE = 'deleteshape',
    CHANGE_COLOR = 'changecolor',
    CHANGE_SHAPE = 'changeshape',
}

export class ShapesController {
    private _shapeHandlers: Record<ShapeType, (args: DetailedShapeOptions) => void>;
    private _changeShapeHandlers: Record<ShapeType, (args: DetailedChangeShapeOptions) => void>;
    private _actionHandlers: Record<Actions, (args: string[]) => void>;


    constructor(private _picture: Picture, private _canvas: ICanvas) {
        this._shapeHandlers = {
            [ShapeType.RECTANGLE]: (args: ShapeOptions<RectangleOptions>) => {
                this._addRectangle(args);
            },
            [ShapeType.CIRCLE]: (args: ShapeOptions<CircleOptions>) => {
                this._addCircle(args);
            },
            [ShapeType.TRIANGLE]: (args: ShapeOptions<TriangleOptions>) => {
                this._addTriangle(args);
            },
            [ShapeType.LINE]: (args: ShapeOptions<LineOptions>) => {
                this._addLine(args);
            },
            [ShapeType.TEXT]: (args: ShapeOptions<TextOptions>) => {
                this._addText(args);
            },
        };

        this._changeShapeHandlers = {
            [ShapeType.RECTANGLE]: (args: ChangeShapeOptions<RectangleOptions>) => {
                this._changeToRectangle(args);
            },
            [ShapeType.CIRCLE]: (args: ChangeShapeOptions<CircleOptions>) => {
                this._changeToCircle(args);
            },
            [ShapeType.TRIANGLE]: (args: ChangeShapeOptions<TriangleOptions>) => {
                this._changeToTriangle(args);
            },
            [ShapeType.LINE]: (args: ChangeShapeOptions<LineOptions>) => {
                this._changeToLine(args);
            },
            [ShapeType.TEXT]: (args: ChangeShapeOptions<TextOptions>) => {
                this._changeToText(args);
            },
        };

        this._actionHandlers = {
            [Actions.ADD_SHAPE]: (args: string[]) => {
                this._addShape(args);
            },
            [Actions.DRAW_PICTURE]: (args: string[]) => {
                this._drawPicture();
            },
            [Actions.LIST]: (args: string[]) => {
                this._list();
            },
            [Actions.MOVE_SHAPE]: (args: string[]) => {
                this._moveShape(args);
            },
            [Actions.MOVE_PICTURE]: (args: string[]) => {
                this._movePicture(args);
            },
            [Actions.DELETE_SHAPE]: (args: string[]) => {
                this._deleteShape(args);
            },
            [Actions.CHANGE_COLOR]: (args: string[]) => {
                this._changeColor(args);
            },
            [Actions.DRAW_SHAPE]: (args: string[]) => {
                this._drawShape(args);
            },
            [Actions.CHANGE_SHAPE]: (args: string[]) => {
                this._changeShape(args);
            },
        }
    }

    handleCommand(command: string): void {
        const [action, ...args] = command.split(" ");

        const lowerCaseAction = action.toLowerCase();

        if (this._actionHandlers.hasOwnProperty(lowerCaseAction)) {
            this._actionHandlers[lowerCaseAction](args);
            return;
        }

        console.error(`Неизвестная комманда: ${action}`);
    }

    private _addShape(args: string[]): void {
        const shapeArguments: DetailedShapeOptions = remapShapeArguments(args);

        this._shapeHandlers[shapeArguments.type](shapeArguments);
    }

    private _moveShape(args: string[]): void {
        const {id, dx, dy}: MoveShapeArguments = remapMoveShapeArguments(args);

        this._picture.moveShape(id, dx, dy);
    }

    private _deleteShape(args: string[]): void {
        const {id}: IdArguments = remapIdArguments(args);

        this._picture.deleteShape(id);
    }

    private _changeShape(args: string[]): void {
        const changeShapeArguments: DetailedChangeShapeOptions = remapChangeShapeArguments(args);

        this._changeShapeHandlers[changeShapeArguments.type](changeShapeArguments);
    }

    private _drawShape(args: string[]): void {
        const {id}: IdArguments = remapIdArguments(args);

        this._picture.drawShape(id, this._canvas);
    }

    private _movePicture(args: string[]): void {
        const {dx, dy}: MoveArguments = remapMoveArguments(args);

        this._picture.movePicture(dx, dy);
    }

    private _changeColor(args: string[]): void {
        const {id, color}: ChangeColorArguments = remapChangeColorArguments(args);

        this._picture.changeColor(id, color)
    }

    private _addRectangle(rectangleArguments: ShapeOptions<RectangleOptions>): void {
        const {id, color, point, size} = rectangleArguments;

        this._picture.addShape(new Shape(id, new RectangleShapeStrategy(color, point, size)));
    }

    private _changeToRectangle(rectangleArguments: ChangeShapeOptions<RectangleOptions>): void {
        const {id, point, size} = rectangleArguments;

        this._picture.changeToRectangle(id, point, size);
    }

    private _changeToCircle(circleArguments: ChangeShapeOptions<CircleOptions>): void {
        const {id, point, radius} = circleArguments;

        this._picture.changeToCircle(id, point, radius);
    }

    private _changeToTriangle(triangleArguments: ChangeShapeOptions<TriangleOptions>): void {
        const {id, point1, point2, point3} = triangleArguments;

        this._picture.changeToTriangle(id, point1, point2, point3);
    }

    private _changeToLine(lineArguments: ChangeShapeOptions<LineOptions>): void {
        const {id, point1, point2} = lineArguments;

        this._picture.changeToLine(id, point1, point2);
    }

    private _changeToText(textArguments: ChangeShapeOptions<TextOptions>): void {
        const {id, point, fontSize, data} = textArguments;

        this._picture.changeToText(id, point, fontSize, data);
    }

    private _addTriangle(triangleArguments: ShapeOptions<TriangleOptions>): void {
        const {id, color, point1, point2, point3} = triangleArguments;

        this._picture.addShape(new Shape(id, new TriangleShapeStrategy(color, point1, point2, point3)));
    }

    private _addCircle(circleArguments: ShapeOptions<CircleOptions>): void {
        const {id, color, point, radius} = circleArguments;

        this._picture.addShape(new Shape(id, new CircleShapeStrategy(color, point, radius)));
    }

    private _addLine(lineArguments: ShapeOptions<LineOptions>): void {
        const {id, color, point1, point2} = lineArguments;

        this._picture.addShape(new Shape(id, new LineShapeStrategy(color, point1, point2)));
    }

    private _addText(textArguments: ShapeOptions<TextOptions>): void {
        const {id, color, point, fontSize, data} = textArguments;

        this._picture.addShape(new Shape(id, new TextShapeStrategy(color, point, fontSize, data)));
    }

    private _drawPicture(): void {
        this._picture.draw(this._canvas);
    }

    private _list(): void {
        const shapes = this._picture.list();

        if (shapes.size === 0) {
            console.log('Нет фигур!')
            return;
        }

        Array.from(shapes).forEach(
            ([, shape], index) => {
            console.log(`${index + 1} ${shape.performToString()}`);
          }
        );
    }
}