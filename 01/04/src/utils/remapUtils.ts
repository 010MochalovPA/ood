import { ChangeColorArguments, DetailedChangeShapeOptions, DetailedShapeOptions, IdArguments, MoveArguments, MoveShapeArguments, ShapeType, SpecificShapeOptions } from "../types";
import { validateColor, validateId, validateNumber, validateOptions, validateShapeType } from "./validationUtils";

function remapShapeArguments(args: string[]): DetailedShapeOptions {
    const [id, color, type, ...options] = args;

    const validatedId: string = validateId(id);
    const validatedColor: string = validateColor(color);
    const validatedType: ShapeType = validateShapeType(type);
    const validatedOptions: SpecificShapeOptions = validateOptions(validatedType, options)

    return {
        id: validatedId,
        color: validatedColor,
        type: validatedType,
        ...validatedOptions,
    } as DetailedShapeOptions
}

function remapChangeShapeArguments(args: string[]): DetailedChangeShapeOptions {
    const [id, type, ...options] = args;

    const validatedId: string = validateId(id);
    const validatedType: ShapeType = validateShapeType(type);
    const validatedOptions: SpecificShapeOptions = validateOptions(validatedType, options)

    return {
        id: validatedId,
        type: validatedType,
        ...validatedOptions,
    } as DetailedChangeShapeOptions
}

function remapMoveShapeArguments(args: string[]): MoveShapeArguments {
    const [id, dx, dy] = args;

    const validatedId: string = validateId(id);
    const validatedDx: number = validateNumber(dx);
    const validatedDy: number = validateNumber(dy);

    return {
        id: validatedId,
        dx: validatedDx,
        dy: validatedDy,
    }
}

function remapChangeColorArguments(args: string[]): ChangeColorArguments {
    const [id, color] = args;

    const validatedId: string = validateId(id);
    const validatedColor: string = validateColor(color);

    return {
        id: validatedId,
        color: validatedColor,
    }
}

function remapIdArguments(args: string[]): IdArguments {
    const [id] = args;

    return {
        id: validateId(id),
    }
}

function remapMoveArguments(args: string[]): MoveArguments {
    const [dx, dy] = args;

    const validatedDx: number = validateNumber(dx);
    const validatedDy: number = validateNumber(dy);

    return {
        dx: validatedDx,
        dy: validatedDy,
    }
}

export {
    remapShapeArguments,
    remapMoveShapeArguments,
    remapMoveArguments,
    remapIdArguments,
    remapChangeColorArguments,
    remapChangeShapeArguments,
}
