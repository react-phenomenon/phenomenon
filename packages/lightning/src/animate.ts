import { FramesFunction, OperatorFunction, Renderer } from './types'
import { htmlElementRenderer } from './renderers/htmlElementRenderer'

export const animate = (
    target: Renderer | HTMLElement | string,
    operators: OperatorFunction[],
): FramesFunction => {
    const renderer = findRenderer(target)

    return startAt => {
        let offset = startAt

        const serializedFrames = operators
            .map(operator => {
                let serialized = operator(offset)

                if (typeof serialized === 'function') {
                    serialized = serialized(renderer)
                }

                offset += Math.max(...serialized.map(frame => frame.duration))
                return serialized
            })
            .flat()

        return serializedFrames
    }
}

const findRenderer = (target: Renderer | HTMLElement | string): Renderer => {
    if (typeof target === 'function') {
        return target
    }

    if (typeof target === 'string' || target instanceof HTMLElement) {
        return htmlElementRenderer(target)
    }

    throw new Error(`[lighting:animate] Invalid renderer (${target!.toString()})`)
}
