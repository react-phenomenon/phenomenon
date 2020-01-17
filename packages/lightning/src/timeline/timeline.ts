import { AnimationFunction } from '../types'
import { totalDuration } from '../helpers'

export const parallel = (animations: AnimationFunction[]): AnimationFunction => startAt =>
    animations.flatMap(animation => animation(startAt))

export const sequence = (
    animations: AnimationFunction[],
): AnimationFunction => startAt => {
    let offset = startAt

    return animations.flatMap(animation => {
        const serialized = animation(offset)
        offset += totalDuration(serialized)
        return serialized
    })
}
