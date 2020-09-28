import Jimp from 'jimp';
import { rgbToHex, getClosestColor, asciiChars, fillClosestColors } from '../util';
import { hex } from 'chalk';

const fn = (img: Jimp, [char]: string[]) => {
    let res = '';
    const colors = fillClosestColors(asciiChars);
    for (let y = 0; y < img.bitmap.height; y++) {
        for (let x = 0; x < img.bitmap.width; x++) {
            const [rgb1, rgb2] = [[x, y], [x + 1, y]]
                .map(([x, y]) => Object.values(Jimp.intToRGBA(img.getPixelColor(x, y))));
            const rgb = rgb1.map((n, i) => Math.abs(n - rgb2[i]));
            res += char ? hex(rgbToHex(rgb))(char[0]) : asciiChars[getClosestColor(rgb, colors)];
        }
        res += '\n';
    }
    return res;
};

export default {
    name: 'asciidiff',
    aliases: ['asciidifference'],
    description: 'The diff command except ASCII art.',
    args: '[char]',
    noOut: true,
    fn,
};