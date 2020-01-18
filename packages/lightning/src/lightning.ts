import { setCssValue, mapObjectValues, limit, totalDuration } from './helpers'
import { SerializedItem, Type, AnimationFunction } from './types'

const update = (time: number, serialized: SerializedItem[]) => {
    const reset = () => {
        for (const item of serialized) {
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
    }

    const leftApply = () => {
        for (const item of serialized) {
            if (time < item.offset) continue

            switch (item.type) {
                case Type.Tween:
                    setCssValue(
                        item.element,
                        mapObjectValues(item.values, val => {
                            const percent = limit((time - item.offset) / item.duration)
                            return val(item.easing(percent))
                        }),
                    )
                    break

                case Type.Set:
                    setCssValue(
                        item.element,
                        mapObjectValues(
                            item.values,
                            val => val[time <= item.offset ? 0 : 1],
                        ),
                    )
                    break
            }
        }
    }

    reset()
    leftApply()
}

interface LightningOptions {
    onComplete?(): void
    onUpdate?(currentTime: number): void
}

export const lightning = (animations: AnimationFunction, options?: LightningOptions) => {
    let currentTime = 0
    let playing = false

    const serialized = animations(0)
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
                options?.onUpdate?.(currentTime)
            } else if (playing) {
                options?.onComplete?.()
            }

            stats.end()
        }

        requestAnimationFrame(step)
    }

    const pause = () => {
        playing = false
    }

    return { prepare, play, pause, seek, total }
}

// DEV -------------------
// @ts-ignore
// eslint-disable-next-line no-undef
const stats = new require('stats.js')()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)
