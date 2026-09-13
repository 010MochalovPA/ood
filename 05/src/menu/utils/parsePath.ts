function parsePath(str: string): string {
    const path = str.trim();

    if (!path) {
        throw new Error('Path cannot be empty');
    }

    return path;
}

export {
    parsePath,
}