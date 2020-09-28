import Jimp from 'jimp';
import { createCanvas } from 'canvas';
import { getClosestColor, rgbToHex } from '../util';

const colors = Array.from({ length: 256 }, (_, i) => [i, i, i]);

const fn = (img: Jimp, args: string[]) => {
    const [lineRarity = 1, lineWidth = 0.5, lineXOffMax = 2, lineXOffMin = 0] = args.map(x => +x || undefined);
    const canvas = createCanvas(img.bitmap.width, img.bitmap.height);
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = '#eeeeee';
    ctx.fillRect(0, 0, img.bitmap.width, img.bitmap.height);
    for (
        const coords of Array.from(
            { length: ~~(img.bitmap.width / lineRarity) },
            (_, i, chance = Math.random()) => Array
                .from({ length: img.bitmap.height }, () => 0)
                .reduce(a => {
                    const last = a[a.length - 1];
                    const n = Math.random() > 0.5 ? ~~(Math.random() * (lineXOffMax + lineXOffMin)) - lineXOffMin : 0;
                    return [...a, last + n * (Math.random() > chance || last - n <= 0 ? 1 : -1)];
                }, [i * lineRarity]),
        )
    ) {
        for (let y = 0; y < coords.length; y++) {
            ctx.beginPath();
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = rgbToHex(colors[getClosestColor(Object.values(Jimp.intToRGBA(img.getPixelColor(coords[y], y))), colors)]);
            ctx.moveTo(coords[y], y);
            ctx.lineTo(coords[y + 1] || coords[y], y + 1);
            ctx.stroke();
        }
    }
    return canvas.toBuffer();
};

export default {
    name: 'sketch',
    description: 'Apply a pencil drawn-like effect to an image.',
    args: '[lineRarity] [lineWidth] [xOffMax] [xOffMin]',
    fn,
};