import Jimp from 'jimp';
import { createCanvas } from 'canvas';
import { rgbToHex, resolveColor, getClosestColor } from '../util';

const fn = (img: Jimp, colors: string[]) => {
    const resolvedColors = <number[][]><unknown>colors.map(resolveColor).filter(x => x);
    const canvas = createCanvas(img.bitmap.width, img.bitmap.height);
    const ctx = canvas.getContext('2d');
    for (let y = 0; y < img.bitmap.height; y++) {
        for (let x = 0; x < img.bitmap.width; x++) {
            const rgb = <number[]>Object.values(Jimp.intToRGBA(img.getPixelColor(x, y)));
            ctx.beginPath();
            ctx.fillStyle = rgbToHex(resolvedColors[getClosestColor(rgb, resolvedColors)] || resolvedColors[0]);
            ctx.fillRect(x, y, x + 1, y + 1);
        }
    }
    return canvas.toBuffer();
};

export default {
    name: 'round',
    aliases: ['closestcolor'],
    description: 'Change each pixel of an image to the closest given color.',
    args: '...<colors>',
    fn,
};