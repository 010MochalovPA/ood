function requireMinArgs(parts: string[], min: number): void {
    if (parts.length < min) {
        throw new Error(`Expected at least ${min} arguments, got ${parts.length}`);
    }
}

export {
    requireMinArgs,
}