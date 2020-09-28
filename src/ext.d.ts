declare module 'ascii-table' {
    export default class Table {
        constructor(title: string);
        public __rows: string[][];
        public addRow(...arr: string[]): this;
        public setHeading(...arr: string[]): this;
    }
}