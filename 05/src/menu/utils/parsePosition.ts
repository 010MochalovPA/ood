const MIN_POSITION = 1;

function parsePosition(str: string, count: number): number {
    const num = Number(str);

    if (!Number.isInteger(num) || num < MIN_POSITION) {
        throw new Error('Position must be a positive integer');
    }

    if (num > count) {
        throw new Error(`Position ${num} is out of range (document has ${count} items)`);
    }

    return num - 1;
}

function parsePositionOrEnd(str: string, count: number): number {
    if (str.toLowerCase() === 'end') {
        return count;
    }
    return parsePosition(str, count);
}

export { parsePosition, parsePositionOrEnd };