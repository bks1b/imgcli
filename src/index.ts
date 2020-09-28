#!/usr/bin/env node

import { writeFileSync } from 'fs';
import Jimp from 'jimp';
import Command from './Command';
import * as Commands from './commands';

const commands = <Command[]>Object.values(Commands);
const [,, commandName = '', inp, out, ...args] = process.argv;
const command = commands.find(c => [c.name, ...(c.aliases ?? [])].includes(commandName.toLowerCase()));

if (!command || ['help', 'commands'].includes(commandName.toLowerCase())) {
    console.log(commands.find(x => x.name === 'help')!.fn(null, [inp], commands));
}
else {
    if (!inp) console.log('Please give an input path or URL.');
    if (!out && !command.noOut) console.log('Please give an output path.');
    (async () => {
        try {
            const img = await Jimp.read(inp);
            const res = command.fn(img, command.noOut ? [out, ...args].filter(x => x) : args);
            if (res instanceof Buffer) {
                writeFileSync(out, res);
                console.log(`Successfully outputted result into ${out}`);
            } else {
                console.log(res);
            }
        } catch (e) {
            console.log(e.message);
        }
    })();
}
