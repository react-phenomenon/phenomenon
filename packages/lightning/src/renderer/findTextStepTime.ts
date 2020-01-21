import { SerializedItem, Type } from '../types'

interface NextStepTime {
    nextTime: number
    pause: boolean
    end: boolean
    nextTimeIndex: number
}

export const findTextStepTime = (
    prevTime: number,
    prevTimeIndex: number,
    nextTime: number,
    total: number,
    serialized: SerializedItem[],
): NextStepTime => {
    for (const item of serialized) {
        if (
            item.type === Type.Pause &&
            item.start >= prevTime &&
            item.start <= nextTime &&
            item.startIndex > prevTimeIndex
        ) {
            return {
                nextTime: item.start,
                nextTimeIndex: item.startIndex,
                pause: true,
                end: false,
            }
        }
    }

    if (nextTime > total) {
        return {
            nextTime: total,
            nextTimeIndex: 0,
            pause: true,
            end: true,
        }
    }

    return {
        nextTime: nextTime,
        nextTimeIndex: 0,
        pause: false,
        end: false,
    }
}
