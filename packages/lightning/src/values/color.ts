import { limit } from '../helpers'

type Color = [number, number, number, number]

const colorToString = (color: Color): string => `rgba(${color.join(', ')})`

const colorFromHEX = (color: string): Color => {
    const r = parseInt(color.substring(1, 3), 16)
    const g = parseInt(color.substring(3, 5), 16)
    const b = parseInt(color.substring(5, 7), 16)
    return [r, g, b, 1]
}

const colorFromRGB = (color: string): Color => {
    const [r, g, b, a = 1] = color.match(/(\d|\.)+/g)!.map(Number)
    return [r, g, b, a]
}

const getColor = (color: string): Color => {
    if (color.startsWith('#')) {
        return colorFromHEX(color)
    }

    if (color.startsWith('rgb')) {
        return colorFromRGB(color)
    }

    throw new Error(`[lighting:color] Unknown color "${color}", use hex, rgb or rgba`)
}

export const color = (color1: string, color2: string) => {
    const c1 = getColor(color1)
    const c2 = getColor(color2)

    return (p: number) => {
        const n = limit(p)
        const c = []

        for (let i = 0; i < 3; i++) {
            const ce1 = c1[i] * c1[i]
            const ce2 = c2[i] * c2[i]
            c[i] = Math.sqrt(n * (ce2 - ce1) + ce1) >> 0
        }

        c[3] = (c2[3] - c1[3]) * n + c1[3]

        return colorToString(c as Color)
    }
}
