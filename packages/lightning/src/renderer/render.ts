import { limit, mapObjectValues } from '../helpers'
import { SerializedItem, Type } from '../types'

export const render = (
    currentTime: number,
    currentTimeIndex: number,
    serialized: SerializedItem[],
) => {
    for (let i = serialized.length - 1; i >= 0; i--) {
        const item = serialized[i]
        switch (item.type) {
            case Type.Tween:
                item.renderer(mapObjectValues(item.values, val => val(0)))
                break

            case Type.Set:
                item.renderer(mapObjectValues(item.values, val => val[0]))
                break
        }
    }

    for (const item of serialized) {
        if (shouldSkipItem(currentTime, currentTimeIndex, item)) continue

        switch (item.type) {
            case Type.Tween:
                item.renderer(
                    mapObjectValues(item.values, val => {
                        const n = limit((currentTime - item.start) / item.duration)
                        return val(item.easing(n))
                    }),
                )
                break

            case Type.Set:
                item.renderer(
                    mapObjectValues(item.values, val => {
                        const [off, on] = val
                        return currentTime >= item.start + item.duration ? on : off
                    }),
                )
                break
        }
    }
}

export const shouldSkipItem = (
    currentTime: number,
    currentTimeIndex: number,
    item: SerializedItem,
) => {
    if (item.start > currentTime) return true
    if (item.start === currentTime && item.startIndex > currentTimeIndex) return true
    return false
}
