export function importer(values: string, empty: string = '-'): Array<number | undefined> {
    return values.split('').map((value: string): number | undefined => {
        return value === empty ? undefined : Number(value);
    });
}
