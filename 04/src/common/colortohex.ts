import { Color } from "./Color";

function colorToHex(color: Color): string {
    const colors = new Map<Color, string>([
        [Color.Green, '#00FF00'],
        [Color.Red, '#FF0000'],
        [Color.Blue, '#0000FF'],
        [Color.Yellow, '#FFFF00'],
        [Color.Pink, '#FFC0CB'],
        [Color.Black, '#000000'],
        [Color.White, '#FFFFFF'],
    ]);

    if (colors.has(color)) {
        return colors.get(color)!;
    }

    throw new Error(`Unknown color: ${color}`);
}

export {
    colorToHex,
};