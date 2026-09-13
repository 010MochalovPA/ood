function parseIndex(str: string, max: number): number {
    const num = parseInt(str);

    if (isNaN(num)) {
        throw new Error('Index must be a number');
    }

    if (num < 1 || num > max) {
        throw new Error(`Index must be between 1 and ${max}`);
    }

    return num - 1;
}

export {
    parseIndex,
}