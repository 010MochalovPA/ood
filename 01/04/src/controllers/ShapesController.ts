import { ICanvas } from '../gfx/ICanvas';
import { Picture } from '../models/Picture';
import { Circle } from '../models/shapes/Circle';
import { Line } from '../models/shapes/Line';
import { Text } from '../models/shapes/Text';
import { Rectangle } from '../models/shapes/Rectangle';
import { Triangle } from '../models/shapes/Triangle';
import { ChangeColorArguments, CircleOptions, DetailedShapeOptions, IdArguments, LineOptions, MoveArguments, MoveShapeArguments, RectangleOptions,  ShapeOptions,  ShapeType, TextOptions, TriangleOptions } from '../types';
import { remapChangeColorArguments, remapIdArguments, remapMoveArguments, remapMoveShapeArguments, remapShapeArguments } from '../utils/remapUtils';

enum Actions {
    ADD_SHAPE = 'addshape',
    DRAW_PICTURE = 'drawpicture',
    DRAW_SHAPE = 'drawshape',
    LIST = 'list',
    MOVE_PICTURE = 'movepicture',
    MOVE_SHAPE = 'moveshape',
    DELETE_SHAPE = 'deleteshape',
    CHANGE_COLOR = 'changecolor',
}

export class ShapesController {
    private _shapeHandlers: Record<ShapeType, (args: DetailedShapeOptions) => void>;
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

        this._picture.addShape(new Rectangle(id, color, point, size));
    }

    private _addTriangle(triangleArguments: ShapeOptions<TriangleOptions>): void {
        const {id, color, point1, point2, point3} = triangleArguments;

        this._picture.addShape(new Triangle(id, color, point1, point2, point3));
    }

    private _addCircle(circleArguments: ShapeOptions<CircleOptions>): void {
        const {id, color, point, radius} = circleArguments;

        this._picture.addShape(new Circle(id, color, point, radius));
    }

    private _addLine(lineArguments: ShapeOptions<LineOptions>): void {
        const {id, color, point1, point2} = lineArguments;

        this._picture.addShape(new Line(id, color, point1, point2));
    }

    private _addText(textArguments: ShapeOptions<TextOptions>): void {
        const {id, color, point, fontSize, data} = textArguments;

        this._picture.addShape(new Text(id, color, point, fontSize, data));
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