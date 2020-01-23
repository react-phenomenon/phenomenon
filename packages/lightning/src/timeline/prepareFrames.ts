import { SerializedFrame } from '../types'

// @TODO make this immutable
export const prepareFrames = (serializedFrames: SerializedFrame[]) => {
    serializedFrames.sort((a, b) => a.start - b.start)

    for (let i = 0; i < serializedFrames.length; i++) {
        const frame = serializedFrames[i]
        const prevFrame = serializedFrames[i - 1]
        const nextFrame = serializedFrames[i + 1]

        if (prevFrame && prevFrame.start === frame.start) {
            frame.startIndex = prevFrame.startIndex! + 1
        } else if (nextFrame && nextFrame.start === frame.start) {
            frame.startIndex = 1
        }
    }

    return serializedFrames
}
