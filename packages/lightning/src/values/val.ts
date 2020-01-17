export const val = (a: number, b: number, suffix?: string) => (
    n: number,
): string | number => {
    const val = (b - a) * n + a
    return suffix ? val + suffix : val
}
