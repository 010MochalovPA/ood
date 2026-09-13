function parseNumber(numStr: string, min: number, max: number): number {
    const num = Number(numStr);

    if (!Number.isInteger(num)) {
        throw new Error('Argument must be an integer');
    }

    if (num < min || num > max) {
        throw new Error(`Argument must be between ${min} and ${max}`);
    }

    return num;
}

export {
    parseNumber,
};