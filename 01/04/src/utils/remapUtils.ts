import { ChangeColorArguments, DetailedShapeOptions, IdArguments, MoveArguments, MoveShapeArguments } from "../types";
import { validateColor, validateId, validateNumber, validateOptions, validateShapeType } from "./validationUtils";

function remapShapeArguments(args: string[]): DetailedShapeOptions {
    const [id, color, type, ...options] = args;

    const validatedId = validateId(id);
    const validatedColor = validateColor(color);
    const validatedType = validateShapeType(type);
    const validatedOptions = validateOptions(validatedType, options)

    return {
        id: validatedId,
        color: validatedColor,
        type: validatedType,
        ...validatedOptions,
    } as DetailedShapeOptions
}

function remapMoveShapeArguments(args: string[]): MoveShapeArguments {
    const [id, dx, dy] = args;

    const validatedId = validateId(id);
    const validatedDx = validateNumber(dx);
    const validatedDy = validateNumber(dy);

    return {
        id: validatedId,
        dx: validatedDx,
        dy: validatedDy,
    }
}

function remapChangeColorArguments(args: string[]): ChangeColorArguments {
    const [id, color] = args;

    const validatedId = validateId(id);
    const validatedColor = validateColor(color);

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

    const validatedDx = validateNumber(dx);
    const validatedDy = validateNumber(dy);

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
}
