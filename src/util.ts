import Jimp from 'jimp';
import { CanvasRenderingContext2D } from 'canvas';

export const getClosestColor = ([r, g, b]: number[], colors: number[][]) => {
    let res = 0;
    let biggestDifference = 1000;
    for (let i = 0; i < colors.length; i++) {
        const x = Math.sqrt(Math.pow(r - colors[i][0], 2) + Math.pow(g - colors[i][1], 2) + Math.pow(b - colors[i][2], 2));
        if (x < biggestDifference) {
            res = i;
            biggestDifference = x;
        }
    }
    return res;
};

export const rgbToHex = ([r, g, b]: number[]) => '#' + ((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1);

export const averageColor = (d: Jimp) =>
    Array
        .from({ length: d.bitmap.height }, (_, i) => i)
        .flatMap(y => Array.from({ length: d.bitmap.width }, (_, x) => <number[]>Object.values(Jimp.intToRGBA(d.getPixelColor(x, y)))))
        .reduce((a, b) => a.map((x, i) => [...x, b[i]]), <number[][]>[[], [], []])
        .map(x => ~~(x.reduce((a, b) => a + b, 0) / x.length));

export const render = (
    ctx: CanvasRenderingContext2D,
    d: Jimp,
    dX: number,
    dY: number
) => {
    for (let y = 0; y < d.bitmap.height; y++) {
        for (let x = 0; x < d.bitmap.width; x++) {
            const rgb: number[] = Object.values(Jimp.intToRGBA(d.getPixelColor(x, y)));
            const hex = rgbToHex(rgb);
            ctx.beginPath();
            ctx.fillStyle = hex;
            ctx.fillRect(x + dX, y + dY, x + dX + 1, y + dY + 1);
        }
    }
};

export const fillClosestColors = (arr: string[]) => Array.from(
    { length: arr.length },
    (_, i) => Array.from({ length: 3 }, () => ~~(255 / arr.length) * i),
);

export const resolveColor = (x: string) => {
    if (/^#?[a-f0-9]{6}$/gi.test(x)) return x.match(/[a-f0-9]{2}/gi)?.map(x => parseInt(x, 16));
    const split = x.split(',').map(x => +x);
    if (split.length === 3 && split.every(x => !isNaN(x) && x >= 0 && x <= 255)) return split;
};

export const clamp = (n: number) => Math.max(0, Math.min(n, 255));

export const asciiChars = [' ', 'ˇ', '.', ',', '-', '^', '*', '~', '_', ':', ';', '<', '>', '=', '/', '!', '|', '?', '&', '$', '@', '#'];