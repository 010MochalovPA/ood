function parseText(text: string): string {
    if (!text || text.trim().length === 0) {
        throw new Error('Text cannot be empty');
    }
    return text;
}

export {
    parseText,
}