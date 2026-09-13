function splitArgs(args: string, min: number): string[] {
    const parts = args.trim().split(/\s+/);
    
    if (parts.length < min) {
        throw new Error(`Expected at least ${min} arguments, got ${parts.length}`);
    }
    
    return parts;
}

export {
    splitArgs,
}