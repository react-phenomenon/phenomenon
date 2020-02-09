import { FramesFunction, OperatorFunction, Renderer } from '../types'
import { htmlElementRenderer } from '../renderer/renderers'

export const animate = (
    rendererOrSelector: Renderer | string | HTMLElement,
    operators: OperatorFunction[],
): FramesFunction => {
    const renderer = findRenderer(rendererOrSelector)

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

const findRenderer = (rendererOrSelector: Renderer | string | HTMLElement): Renderer => {
    if (typeof rendererOrSelector === 'function') {
        return rendererOrSelector
    }

    if (
        typeof rendererOrSelector === 'string' ||
        rendererOrSelector instanceof HTMLElement
    ) {
        return htmlElementRenderer(rendererOrSelector)
    }

    throw new Error(
        `[lighting:animate] Invalid renderer (${rendererOrSelector!.toString()})`,
    )
}
