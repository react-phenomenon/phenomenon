const pow = Math.pow
const sin = Math.sin
const cos = Math.cos
const PI = Math.PI
const c1 = 1.70158
const c2 = c1 * 1.525
const c3 = c1 + 1
const c4 = (2 * PI) / 3
const c5 = (2 * PI) / 4.5

export const val = (a: number, b: number, suffix?: string) => (n: number) => {
    const val = (b - a) * n + a
    return suffix ? val + suffix : val
}

export const easeOutElastic = (x: number) => {
    return x === 0 ? 0 : x === 1 ? 1 : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1
}

export const setCssValue = (el: HTMLElement, value: any) => {
    Object.assign(el.style, value)
}

export const mapObjectValues = <T, R>(
    object: { [key: string]: T },
    cb: (value: T) => R,
) => Object.fromEntries(Object.entries(object).map(([key, value]) => [key, cb(value)]))

export const limit = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max)
