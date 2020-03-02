import { SerializedFrame } from './types'

const { pow, sin, max } = Math
const PI = Math.PI
const c4 = (2 * PI) / 3

export const easeOutElastic = (x: number) => {
    return x === 0 ? 0 : x === 1 ? 1 : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1
}

export const linear = (x: number) => x

export const mapObjectValues = <T, R>(
    object: { [key: string]: T },
    cb: (value: T) => R,
) => Object.fromEntries(Object.entries(object).map(([key, value]) => [key, cb(value)]))

export const limit = (value: number, min = 0, max = 1) =>
    Math.min(Math.max(value, min), max)

export const totalDuration = (frames: SerializedFrame[]): number =>
    max(...frames.map(frame => frame.startAt + frame.duration))
