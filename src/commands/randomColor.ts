import Jimp from 'jimp';
import { createCanvas } from 'canvas';
import { clamp, rgbToHex } from '../util';

const fn = (img: Jimp, [max]: (string | number)[]) => {
    max = +max || 100;
    const canvas = createCanvas(img.bitmap.width, img.bitmap.height);
    const ctx = canvas.getContext('2d');
    for (let y = 0; y < img.bitmap.height; y++) {
        for (let x = 0; x < img.bitmap.width; x++) {
            const rgba = Jimp.intToRGBA(img.getPixelColor(x, y));
            const rgb = Object
                .values(rgba)
                .map(x => clamp(x + ~~(Math.random() * +max) * (Math.random() > 0.5 ? -1 : 1)));
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
    name: 'randomcolor',
    aliases: ['random'],
    description: 'Modify each pixel of an image by a random color offset.',
    args: '[max]',
    fn,
};