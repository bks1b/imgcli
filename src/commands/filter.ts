import Jimp from 'jimp';
import { rgbToHex } from '../util';
import { createCanvas } from 'canvas';

const fn = (img: Jimp, [typeStr]: [string]) => {
    let type = ['red', 'green', 'blue'].indexOf(`${typeStr}`.toLowerCase());
    if (type < 0) type = 1;
    const canvas = createCanvas(img.bitmap.width, img.bitmap.height);
    const ctx = canvas.getContext('2d');
    for (let y = 0; y < img.bitmap.height; y++) {
        for (let x = 0; x < img.bitmap.width; x++) {
            const rgba = Jimp.intToRGBA(img.getPixelColor(x, y));
            const rgb = Object.values(rgba).map((x, i) => i === type ? 255 : x);
            if (!rgba.a) {
                ctx.clearRect(x, y, x + 1, y + 1);
                continue;
            }
            ctx.beginPath();
            ctx.fillStyle = rgbToHex(rgb);
            ctx.fillRect(x, y, x + 1, y + 1);
        }
    }
    return canvas.toBuffer();
};

export default {
    name: 'filter',
    description: 'Apply a red, green, or blue filter to an image.',
    args: '[color=green]',
    fn,
};