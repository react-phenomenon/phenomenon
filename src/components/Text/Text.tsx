import React, { FC, useEffect, useRef } from 'react'
import { useSlides } from '../../hooks/useSlides'

export const Text: FC<{ in: number; out?: number }> = props => {
    const ref = useRef(null)
    const { addStep } = useSlides()

    useEffect(() => {
        addStep(props.in, () => ({
            targets: ref.current,
            opacity: [0, 1],
        }))

        if (props.out) {
            addStep(-props.out, () => ({
                targets: ref.current,
                keyframes: [
                    { opacity: 0 },
                    {
                        height: 0,
                        margin: 0,
                        padding: 0,
                    },
                ],
            }))
        }
    }, [])

    return <p ref={ref}>{props.children}</p>
}
