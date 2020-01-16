import { OperatorFunction } from './operators'
import { SerializedItem } from '../types'

export const animation = (selector: string, operators: OperatorFunction[]) => (
    timelineOffset = 0,
): SerializedItem[] => {
    const element = document.querySelector(selector) as HTMLElement | null
    let offset = timelineOffset

    if (!element) {
        throw new Error(`[animation] Element ${selector} not found`)
    }

    return operators.map(operator => {
        const serialized = operator(offset, element)
        offset += serialized.duration
        return serialized
    })
}
