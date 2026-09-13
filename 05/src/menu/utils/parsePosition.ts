function parsePosition(str: string, maxPosition: number): number {
    const num = Number(str);
    if (!Number.isInteger(num) || num < 0) {
        throw new Error('Position must be a non-negative integer');
    }
    if (num > maxPosition) {
        throw new Error(`Position must not exceed ${maxPosition}`);
    }
    return num;
}

function parsePositionOrEnd(str: string, endPosition: number): number {
    if (str.toLowerCase() === 'end') {
        return endPosition;
    }
    return parsePosition(str, endPosition);
}

export {
    parsePosition,
    parsePositionOrEnd,
};