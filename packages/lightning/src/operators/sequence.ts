import { FramesFunction } from '../types'
import { totalDuration } from '../helpers'
export const sequence = (frames: FramesFunction[]): FramesFunction => startAt => {
    let offset = startAt
    return frames.flatMap(frameFn => {
        const serialized = frameFn(offset)
        offset = totalDuration(serialized)
        return serialized
    })
}
