import Jimp from 'jimp';
import { rgbToHex } from '../util';
import { hex } from 'chalk';

const fn = (img: Jimp, [char]: string[]) =>
    Array
        .from(
            { length: img.bitmap.height },
            (_, y) =>
                Array
                    .from(
                        { length: img.bitmap.width },
                        (_, x) => hex(
                            rgbToHex(
                                Object.values(
                                    Jimp.intToRGBA(img.getPixelColor(x, y))
                                ),
                            ),
                        )(char?.[0] || '#'),
                    )
                    .join(''),
        )
        .join('\n');

export default {
    name: 'asciicolor',
    description: 'Display an image in command line with colored characters.',
    args: '[char]',
    noOut: true,
    fn,
};