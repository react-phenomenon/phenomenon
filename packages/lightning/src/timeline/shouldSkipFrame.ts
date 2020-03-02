import { SerializedFrame } from '../types'

export const shouldSkipFrame = (
    currentTime: number,
    currentTimeIndex: number,
    frame: SerializedFrame,
) => {
    if (frame.startAt > currentTime) return true
    if (frame.startAt === currentTime && frame.startIndex > currentTimeIndex) return true
    return false
}
