import Jimp from 'jimp';
import { createCanvas } from 'canvas';
import { rgbToHex } from '../util';

const fn = (img: Jimp) => {
    const canvas = createCanvas(img.bitmap.width, img.bitmap.height);
    const ctx = canvas.getContext('2d');
    for (let y = 0; y < img.bitmap.height; y++) {
        for (let x = 0; x < img.bitmap.width; x++) {
            const [rgb, rgb2] = [[x, y], [x + 1, y]]
                .map(([x, y]) => Object.values(Jimp.intToRGBA(img.getPixelColor(x, y))));
            ctx.beginPath();
            ctx.fillStyle = rgbToHex(rgb.map((n, i) => Math.abs(n - rgb2[i])));
            ctx.fillRect(x, y, x + 1, y + 1);
        }
    }
    return canvas.toBuffer();
};

export default {
    name: 'diff',
    aliases: ['difference'],
    description: 'Redraw each pixel of the image with the color being the difference between the color and the color to the right.',
    args: '',
    fn,
};