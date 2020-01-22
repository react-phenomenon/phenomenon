import { SerializedItem } from '../types'

// @TODO make this immutable
export const prepareItems = (serializedItems: SerializedItem[]) => {
    serializedItems.sort((a, b) => a.start - b.start)

    for (let i = 0; i < serializedItems.length; i++) {
        const item = serializedItems[i]
        const prevItem = serializedItems[i - 1]
        const nextItem = serializedItems[i + 1]

        if (prevItem && prevItem.start === item.start) {
            item.startIndex = prevItem.startIndex! + 1
        } else if (nextItem && nextItem.start === item.start) {
            item.startIndex = 1
        }
    }

    return serializedItems
}
