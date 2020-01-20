import { OperatorFunction } from './operators'
import { AnimationFunction } from '../types'

export const animate = (
    selector: string,
    operators: OperatorFunction[],
): AnimationFunction => {
    const element = document.querySelector(selector) as HTMLElement | null

    if (!element) {
        throw new Error(`[animation] Element ${selector} not found`)
    }

    return startAt => {
        let offset = startAt

        const serializedItems = operators.map(operator => {
            const serialized = operator(offset, element)
            offset += serialized.duration
            return serialized
        })

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
}
