import { getClosestColor, asciiChars, fillClosestColors } from '../util';
import Jimp from 'jimp';

const fn = (img: Jimp, [...chars]: string[]) => {
    chars = chars.length ? chars : asciiChars;
    const colors = fillClosestColors(chars);
    let txt = '';
    for (let y = 0; y < img.bitmap.height; y++) {
        for (let x = 0; x < img.bitmap.width; x++) {
            const rgb = Object.values(Jimp.intToRGBA(img.getPixelColor(x, y)));
            const closest = getClosestColor(rgb, colors);
            txt += chars[chars.length - closest] || ' ';
        }
        txt += '\n';
    }
    return txt;
};

export default {
    name: 'asciiart',
    aliases: ['ascii'],
    description: 'Convert an image into ASCII art.',
    args: '...[chars]',
    noOut: true,
    fn,
};