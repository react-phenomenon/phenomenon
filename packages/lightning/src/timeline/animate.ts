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

        return operators.map(operator => {
            const serialized = operator(offset, element)
            offset += serialized.duration
            return serialized
        })
    }
}
