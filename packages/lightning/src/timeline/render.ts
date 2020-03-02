import { limit, mapObjectValues } from '../helpers'
import { SerializedFrame, FrameType } from '../types'
import { shouldSkipFrame } from './shouldSkipFrame'

export const render = (
    currentTime: number,
    currentTimeIndex: number,
    serializedFrames: SerializedFrame[],
) => {
    for (let i = serializedFrames.length - 1; i >= 0; i--) {
        const frame = serializedFrames[i]
        switch (frame.type) {
            case FrameType.Tween:
                frame.renderer(mapObjectValues(frame.values, val => val(0)))
                break

            case FrameType.Set:
                frame.renderer(mapObjectValues(frame.values, val => val[0]))
                break
        }
    }

    for (const frame of serializedFrames) {
        if (shouldSkipFrame(currentTime, currentTimeIndex, frame)) continue

        switch (frame.type) {
            case FrameType.Tween:
                frame.renderer(
                    mapObjectValues(frame.values, val => {
                        const n = limit((currentTime - frame.startAt) / frame.duration)
                        return val(frame.easing(n))
                    }),
                )
                break

            case FrameType.Set:
                frame.renderer(
                    mapObjectValues(frame.values, val => {
                        const [off, on] = val
                        return currentTime >= frame.startAt + frame.duration ? on : off
                    }),
                )
                break
        }
    }
}
