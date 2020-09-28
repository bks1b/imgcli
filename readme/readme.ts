import { readFileSync, writeFileSync } from 'fs';
import Table from 'ascii-table';
import Command from '../src/Command';
import * as Commands from '../src/commands';

const readme = readFileSync('./readme/README.md', 'utf8');
const commandArray = <Command[]><unknown>Object.values(Commands);

const table = new Table('').setHeading('Name', 'Aliases', 'Description', 'Usage');
for (const cmd of commandArray)
    table.addRow(
        cmd.name,
        cmd.aliases ? cmd.aliases.join(', ') : '-',
        cmd.description,
        `\`img ${cmd.name} <input> ${cmd.noOut ? '' : '<outputPath> '}${cmd.args}\``,
    );
table.addRow('', '', '', '<> - required, [] - optional');

writeFileSync(
    './README.md',
    `${readme}

## Commands    
${
    table
        .toString()
        .split('\n')
        .slice(1, -1)
        .join('\n')
}`,
);
