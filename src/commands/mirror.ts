import Jimp from 'jimp';
import { createCanvas } from 'canvas';
import { rgbToHex } from '../util';

const fn = (img: Jimp, types: string[]) => {
    const hor = types.map(x => x.toLowerCase()).includes('horizontal');
    const ver = types.map(x => x.toLowerCase()).includes('vertical');
    const canvas = createCanvas(img.bitmap.width, img.bitmap.height);
    const ctx = canvas.getContext('2d');
    for (let y = 0; y < img.bitmap.height; y++) {
        for (let x = 0; x < img.bitmap.width; x++) {
            const rgba = Jimp.intToRGBA(img.getPixelColor(x, y));
            const rgb = Object.values(rgba);
            const _x = hor ? (img.bitmap.width - x) / 2 : x;
            const _y = ver ? (img.bitmap.height - y) / 2 : y;
            if (!rgba.a) {
                ctx.clearRect(_x, _y, _x + 1, _y + 1);
                continue;
            }
            ctx.beginPath();
            ctx.fillStyle = rgbToHex(rgb);
            ctx.fillRect(_x, _y, _x + 1, _y + 1);
        }
    }
    return canvas.toBuffer();
};

export default {
    name: 'mirror',
    description: 'Mirror an image horizontally and/or vertically.',
    args: '[horizontal] [vertical]',
    fn,
};