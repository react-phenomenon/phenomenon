import { animation } from './animation'
import { SerializedItem } from '../types'

export interface AnimationOptions {
    type: 'parallel' | 'sequence'
    startAt: number
}

export const defaultOptions: AnimationOptions = {
    type: 'sequence',
    startAt: 0,
}

type Animation = ReturnType<typeof animation> | SerializedItem[]

export const timeline = (
    animations: Animation[],
    userOptions: Partial<AnimationOptions> = {},
) => (timelineOffset: number = defaultOptions.startAt): SerializedItem[] => {
    const { startAt = timelineOffset, type = defaultOptions.type } = userOptions

    if (type === 'parallel') {
        return animations.flatMap(animation => {
            if (typeof animation === 'function') {
                return animation(startAt)
            }
            return animation
        })
    }

    if (type === 'sequence') {
        let offset = startAt

        return animations.flatMap(animation => {
            const serialized =
                typeof animation === 'function' ? animation(offset) : animation
            offset += totalDuration(serialized)
            return serialized
        })
    }

    throw new Error(`[timeline] Unknown timeline type [${type}]`)
}

export const totalDuration = (items: SerializedItem[]): number => {
    const last = items[items.length - 1]
    return last.offset + last.duration
}
