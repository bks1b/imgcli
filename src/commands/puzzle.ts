import { createCanvas } from 'canvas';
import Jimp from 'jimp';
import { render, averageColor, getClosestColor } from '../util';

const fn = async (img: Jimp, [width, height, ...subPaths]: [string | number, string | number, ...string[]]) => {
    const subImgs = await Promise.all(subPaths.map(p => Jimp.read(p)));
    width = +width || subImgs[0].bitmap.width;
    height = +height || subImgs[0].bitmap.height;
    if (subImgs.some(x => x.bitmap.width !== width || x.bitmap.height !== height)) throw new RangeError('All sub images must have the specified width and height.');
    const canvas = createCanvas(img.bitmap.width * width, img.bitmap.height * height);
    const ctx = canvas.getContext('2d');
    const subImgAvgs = subImgs.map(x => averageColor(x));
    for (let y = 0; y < img.bitmap.height; y++) {
        for (let x = 0; x < img.bitmap.width; x++) {
            const rgb: number[] = Object.values(Jimp.intToRGBA(img.getPixelColor(x, y)));
            const closest = subImgs[getClosestColor(rgb, subImgAvgs)];
            render(ctx, closest, x * width, y * height);
        }
    }
    return canvas.toBuffer();
};

export default {
    name: 'puzzle',
    aliases: ['mix'],
    description: 'Put an image together from other specified images.',
    args: '<width> <height> ...<subPaths>',
    fn,
};