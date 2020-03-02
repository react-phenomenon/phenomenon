import { FramesFunction } from '../types'

interface CascadeOptions {
    offset: (index: number) => number
}

export const cascade = (
    frames: FramesFunction[],
    options: CascadeOptions,
): FramesFunction => startAt =>
    frames.flatMap((frameFn, index) => {
        const offset = options.offset(index) + startAt
        return frameFn(offset)
    })
