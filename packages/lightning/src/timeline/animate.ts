import { FramesFunction, OperatorFunction, Renderer } from '../types'

export const animate = (
    renderer: Renderer,
    operators: OperatorFunction[],
): FramesFunction => {
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
