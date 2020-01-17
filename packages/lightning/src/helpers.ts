const { pow, sin, abs, floor } = Math
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

export const linear = (x: number) => x

export const setCssValue = (el: HTMLElement, value: any) => {
    Object.assign(el.style, value)
}

export const mapObjectValues = <T, R>(
    object: { [key: string]: T },
    cb: (value: T) => R,
) => Object.fromEntries(Object.entries(object).map(([key, value]) => [key, cb(value)]))

export const limit = (value: number, min = 0, max = 1) =>
    Math.min(Math.max(value, min), max)

const toHex = (r: number, g: number, b: number) => {
    const R = r.toString(16)
    const G = g.toString(16)
    const B = b.toString(16)
    return (
        '#' +
        (R.length === 1 ? '0' + R : R) +
        (G.length === 1 ? '0' + G : G) +
        (B.length === 1 ? '0' + B : B)
    )
}

const toRGB = (color: string) => {
    const r = parseInt(color.substring(1, 3), 16)
    const g = parseInt(color.substring(3, 5), 16)
    const b = parseInt(color.substring(5, 7), 16)
    return {
        r: r,
        g: g,
        b: b,
    }
}

export const color = (color1: string, color2: string) => {
    const c1 = toRGB(color1)
    const c2 = toRGB(color2)

    return (p: number) => {
        const n = limit(p)
        return toHex(
            abs(floor(c2.r * n + c1.r * (1 - n))),
            abs(floor(c2.g * n + c1.g * (1 - n))),
            abs(floor(c2.b * n + c1.b * (1 - n))),
        )
    }
}
