export const text = (txt: string) => (n: number): string | number => {
    return txt.substr(0, txt.length * n)
}
