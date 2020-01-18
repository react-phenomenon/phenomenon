import { setCssValue, mapObjectValues, limit, totalDuration } from './helpers'
import { SerializedItem, Type, AnimationFunction } from './types'

interface LightningOptions {
    onComplete?(): void
    onUpdate?(currentTime: number): void
}

interface LightingInstance {
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
    let playing = false

    const serialized = animations(0).sort((a, b) => a.offset - b.offset)
    const total = totalDuration(serialized)

    const prepare = () => {
        update(currentTime, serialized)
    }

    const seek = (t: number) => {
        currentTime = t
        update(currentTime, serialized)
    }

    const play = () => {
        let start = 0
        playing = true

        const step = (time: number) => {
            stats.begin()

            if (!start) start = time - currentTime
            currentTime = time - start

            if (currentTime < total && playing) {
                seek(currentTime)
                requestAnimationFrame(step)
                options.onUpdate?.(currentTime)
            } else if (playing) {
                options.onComplete?.()
            }

            stats.end()
        }

        requestAnimationFrame(step)
    }

    const pause = () => {
        playing = false
    }

    return { prepare, play, pause, seek, total, __dev: { options, serialized } }
}

const update = (currentTime: number, serialized: SerializedItem[]) => {
    for (let index = serialized.length - 1; index >= 0; index--) {
        const item = serialized[index]
        switch (item.type) {
            case Type.Tween:
                setCssValue(
                    item.element,
                    mapObjectValues(item.values, val => val(0)),
                )
                break

            case Type.Set:
                setCssValue(
                    item.element,
                    mapObjectValues(item.values, val => val[0]),
                )
                break
        }
    }

    for (const item of serialized) {
        if (currentTime < item.offset) continue

        switch (item.type) {
            case Type.Tween:
                setCssValue(
                    item.element,
                    mapObjectValues(item.values, val => {
                        const percent = limit((currentTime - item.offset) / item.duration)
                        return val(item.easing(percent))
                    }),
                )
                break

            case Type.Set:
                setCssValue(
                    item.element,
                    mapObjectValues(item.values, val => {
                        const index =
                            currentTime >= item.offset
                                ? currentTime === 0 && item.offset === 0
                                    ? 0
                                    : 1
                                : 0
                        return val[index]
                    }),
                )
                break
        }
    }
}

// DEV -------------------
// @ts-ignore
// eslint-disable-next-line no-undef
const stats = new require('stats.js')()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)
