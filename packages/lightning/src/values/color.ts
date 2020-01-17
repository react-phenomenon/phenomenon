import { limit } from '../helpers'

const { abs, floor } = Math

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
