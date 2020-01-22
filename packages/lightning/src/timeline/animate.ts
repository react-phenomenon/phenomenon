import { AnimationFunction, OperatorFunction, Renderer } from '../types'

export const animate = (
    renderer: Renderer,
    operators: OperatorFunction[],
): AnimationFunction => {
    return startAt => {
        let offset = startAt

        const serializedItems = operators
            .map(operator => {
                let serialized = operator(offset)

                if (typeof serialized === 'function') {
                    serialized = serialized(renderer)
                }

                offset += Math.max(...serialized.map(item => item.duration))
                return serialized
            })
            .flat()

        return serializedItems
    }
}
