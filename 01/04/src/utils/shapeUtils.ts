import { Point } from "../types";

function movePoint(point: Point, dx: number, dy: number): Point {
    return {
        x: point.x + dx,
        y: point.y + dy
    };
}

export {
    movePoint
}