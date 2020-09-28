import Command from '../Command';
import Table from 'ascii-table';
import { inverse } from 'chalk';

const fn = (_: null, [name = '']: string[], commands: Command[]) => {
    const found = commands.find(c => [c.name, ...(c.aliases ?? [])].includes(name.toLowerCase()));
    if (found)
        return `${inverse(found.name)}\n${
            found.aliases
                ? `Aliases: ${found.aliases.map(x => inverse(x)).join(', ')}\n`
                : ''
        }Description: ${found.description}\nUsage: ${
            inverse(`img ${found.name} ${found.args}`)
        }`;
    const table = new Table('Command List')
        .setHeading('Name', 'Aliases', 'Description', 'Usage');
    for (const cmd of commands)
        table.addRow(
            cmd.name,
            cmd.aliases ? cmd.aliases.join(', ') : '-',
            cmd.description,
            `img ${cmd.name} <input> ${cmd.noOut ? '' : '<outputPath> '}${cmd.args}`
        );
    table
        .addRow(...Array
            .from(
                { length: 4 },
                (_, i) => '-'.repeat(
                    Math.max(...table.__rows.map(r => r[i].length))
                )
            )
        )
        .addRow('', '', '', '<> - required, [] - optional');
    return table.toString();
};

export default {
    name: 'help',
    aliases: ['commands'],
    description: 'Get a list of available commands, or information about the given command.',
    args: '[commandName]',
    fn,
};