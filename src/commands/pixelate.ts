import Jimp from 'jimp';
import { createCanvas } from 'canvas';
import { rgbToHex } from '../util';

const fn = (img: Jimp, [nIn]: [string]) => {
    const n = +nIn || 10;
    const canvas = createCanvas(img.bitmap.width, img.bitmap.height);
    const ctx = canvas.getContext('2d');
    for (let y = 0; y < img.bitmap.height; y += n) {
        for (let x = 0; x < img.bitmap.width; x += n) {
            const avg = Array
                .from({ length: n }, (_, i) => i + y)
                .flatMap(y => Array.from({ length: n }, (_, i) => <number[]>Object.values(Jimp.intToRGBA(img.getPixelColor(x + i, y)))))
                .reduce((a, b) => a.map((x, i) => [...x, b[i]]), <number[][]>[[], [], []])
                .map(x => ~~(x.reduce((a, b) => a + b, 0) / x.length));
            ctx.beginPath();
            ctx.fillStyle = rgbToHex(avg);
            ctx.fillRect(x, y, x + n, y + n);
        }
    }
    return canvas.toBuffer();
};

export default {
    name: 'pixelate',
    aliases: ['pixel', 'censor'],
    description: 'Pixelate every n*n area of an image.',
    args: '[n]',
    fn,
};