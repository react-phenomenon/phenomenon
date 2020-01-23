import { FramesFunction } from '../types'
import { totalDuration } from '../helpers'

export const parallel = (frames: FramesFunction[]): FramesFunction => startAt =>
    frames.flatMap(frameFn => frameFn(startAt))

export const sequence = (frames: FramesFunction[]): FramesFunction => startAt => {
    let offset = startAt

    return frames.flatMap(frameFn => {
        const serialized = frameFn(offset)
        offset = totalDuration(serialized)
        return serialized
    })
}

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
