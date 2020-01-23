import { SerializedFrame, FrameType } from '../types'

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
    serializedFrames: SerializedFrame[],
): NextStepTime => {
    for (const frame of serializedFrames) {
        if (
            frame.type === FrameType.Pause &&
            frame.start >= prevTime &&
            frame.start <= nextTime &&
            frame.startIndex > prevTimeIndex
        ) {
            return {
                nextTime: frame.start,
                nextTimeIndex: frame.startIndex,
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
