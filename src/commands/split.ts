import Jimp from 'jimp';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { createCanvas } from 'canvas';
import { rgbToHex } from '../util';

const fn = (img: Jimp, [outDir, sizeS, prefix = '']: string[]) => {
    const size = +sizeS || Math.ceil(Math.sqrt(Math.min(img.bitmap.width, img.bitmap.height)));
    const res: [number, number, RGBA][][] = [];
    for (let y = 0; y < img.bitmap.height; y += size) {
        for (let x = 0; x < img.bitmap.width; x += size) {
            const tile = Array
                .from({ length: size }, (_, i) => i + y)
                .flatMap(_y => Array.from({ length: size }, (_, i) => <[number, number, RGBA]>[i, _y - y, Jimp.intToRGBA(img.getPixelColor(x + i, _y))]));
            res.push(tile);
        }
    }
    if (!existsSync(outDir)) mkdirSync(outDir);
    let i = 0;
    for (const tile of res) {
        const canvas = createCanvas(size, size);
        const ctx = canvas.getContext('2d');
        for (const [x, y, rgba] of tile) {
            if (!rgba.a) continue;
            const hex = rgbToHex(Object.values(rgba));
            ctx.beginPath();
            ctx.fillStyle = hex;
            ctx.fillRect(x, y, x + 1, y + 1);
        }
        writeFileSync(join(outDir, `${prefix}${++i}.png`), canvas.toBuffer());
    }
    return `Successfully split image into ${outDir}.`;
};

export default {
    name: 'split',
    description: 'Split an image into n*n tiles.',
    args: '<outDir> [n] [prefix]',
    noOut: true,
    fn,
};

interface RGBA {
    r: number;
    g: number;
    b: number;
    a: number;
}