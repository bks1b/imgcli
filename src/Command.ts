import Jimp from 'jimp';

export default interface Command {
    name: string;
    aliases?: string[];
    description: string;
    args: string;
    noOut?: boolean;
    fn: (img: Jimp | null, args: string[], commands?: Command[]) => string | Buffer;
};