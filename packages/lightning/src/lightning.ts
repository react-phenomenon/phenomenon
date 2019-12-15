import { setCssValue, mapObjectValues, limit } from './helpers'

export enum Type {
    Tween,
    Set,
    Action,
    Pause,
}

interface SerializedSetValues {
    [key: string]: [any, any]
}

interface SerializedSet {
    type: Type.Set
    offset: number
    duration: 0
    element: HTMLElement
    values: SerializedSetValues
}

interface SerializedTweenValues {
    [key: string]: (p: number) => any
}

interface SerializedTween {
    type: Type.Tween
    offset: number
    duration: number
    element: HTMLElement
    values: SerializedTweenValues
    easing(p: number): number
}

export type SerializedItem = SerializedSet | SerializedTween

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
                            const percent = limit(
                                (time - item.offset) / item.duration,
                                0,
                                1,
                            )
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

const getTotal = (serialized: SerializedItem[]) =>
    Math.max(...serialized.map(item => item.offset + item.duration))

interface LightningOptions {
    onComplete?(): void
    onUpdate?(currentTime: number): void
}

export const lightning = (serialized: SerializedItem[], options?: LightningOptions) => {
    let currentTime = 0
    let playing = false

    const total = getTotal(serialized)

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

        const step = (timestamp: number) => {
            stats.begin()

            if (!start) start = timestamp
            currentTime = timestamp - start

            stats.end()
            if (currentTime < total && playing) {
                seek(currentTime)
                requestAnimationFrame(step)
                options?.onUpdate?.(currentTime)
            } else if (playing) {
                options?.onComplete?.()
            }
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
