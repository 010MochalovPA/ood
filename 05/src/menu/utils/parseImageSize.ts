const MIN_IMAGE_SIZE = 1;
const MAX_IMAGE_SIZE = 10000;

function parseImageSize(str: string): number {
    const num = Number(str);

    if (!Number.isInteger(num)) {
        throw new Error('Image size must be an integer');
    }

    if (num < MIN_IMAGE_SIZE || num > MAX_IMAGE_SIZE) {
        throw new Error(`Image size must be between ${MIN_IMAGE_SIZE} and ${MAX_IMAGE_SIZE}`);
    }

    return num;
}

export {
    parseImageSize,
};