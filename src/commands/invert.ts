import Jimp from 'jimp';
import { createCanvas } from 'canvas';
import { render } from '../util';

const fn = (img: Jimp) => {
    const canvas = createCanvas(img.bitmap.width, img.bitmap.height);
    const ctx = canvas.getContext('2d');
    render(ctx, img.invert(), 0, 0);
    return canvas.toBuffer();
};

export default {
    name: 'invert',
    description: 'Invert colors of an image.',
    args: '',
    fn,
};