import { averageColor, rgbToHex } from '../util';
import { hex } from 'chalk';
import Jimp from 'jimp';

const fn = (img: Jimp) => {
    const rgb = averageColor(img);
    const hexStr = rgbToHex(rgb);
    return hex(hexStr)(`RGB(${rgb.join(',')}), ${hexStr}`);
};

export default {
    name: 'averagecolor',
    aliases: ['avgcolor'],
    description: 'Get the overall average color of an image.',
    args: '',
    noOut: true,
    fn,
};