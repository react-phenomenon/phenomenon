import { AnimationFunction, OperatorFunction } from '../types'

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

        const serializedItems = operators
            .map(operator => {
                let serialized = operator(offset)

                if (typeof serialized === 'function') {
                    serialized = serialized(element)
                }

                offset += Math.max(...serialized.map(item => item.duration))
                return serialized
            })
            .flat()

        return serializedItems
    }
}
