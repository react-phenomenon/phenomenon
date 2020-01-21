import { totalDuration } from './helpers'
import { SerializedItem, AnimationFunction } from './types'
import { render } from './renderer/render'
import { findTextStepTime } from './renderer/findTextStepTime'

interface LightningOptions {
    onPause?(): void
    onComplete?(): void
    onUpdate?(currentTime: number, currentTimeIndex: number): void
}

export interface LightingInstance {
    prepare: () => void
    play: () => void
    pause: () => void
    seek: (t: number) => void
    total: number
    __dev: {
        options: LightningOptions
        serialized: SerializedItem[]
    }
}

export const lightning = (
    animations: AnimationFunction,
    options: LightningOptions = {},
): LightingInstance => {
    let currentTime = 0
    let currentTimeIndex = 0
    let playing = false

    const serialized = animations(0).sort((a, b) => a.start - b.start)
    const total = totalDuration(serialized)

    const prepare = () => {
        render(currentTime, currentTimeIndex, serialized)
    }

    const seek = (time: number, offsetIndex = 0) => {
        currentTime = time
        currentTimeIndex = offsetIndex
        updateOnCurrent()
    }

    const updateOnCurrent = () => {
        render(currentTime, currentTimeIndex, serialized)
        options.onUpdate?.(currentTime, currentTimeIndex)
    }

    const play = () => {
        let start = 0
        playing = true

        const step = (time: number) => {
            stats.begin()

            if (!start) start = time - currentTime
            const nextRafTime = time - start

            // skip first frame TODO?
            if (nextRafTime === currentTime) {
                requestAnimationFrame(step)
                return
            }

            const { nextTime, nextTimeIndex, pause, end } = findTextStepTime(
                currentTime,
                currentTimeIndex,
                nextRafTime,
                total,
                serialized,
            )

            currentTime = nextTime
            currentTimeIndex = nextTimeIndex

            updateOnCurrent()

            if (end) {
                playing = false
                options.onComplete?.()
                return
            }

            if (!playing || pause) {
                playing = false
                options.onPause?.()
                return
            }

            requestAnimationFrame(step)

            stats.end()
        }

        requestAnimationFrame(step)
    }

    const pause = () => {
        playing = false
    }

    return { prepare, play, pause, seek, total, __dev: { options, serialized } }
}

// DEV -------------------
// @ts-ignore
// eslint-disable-next-line no-undef
const stats = new require('stats.js')()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)
