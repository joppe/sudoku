export function remove(values: Array<number>, possibilities: Array<number>): Array<number> {
    if (possibilities.length === 1) {
        return possibilities;
    }

    return possibilities.filter((possibility: number): boolean => {
        return values.indexOf(possibility) === -1;
    });
}
