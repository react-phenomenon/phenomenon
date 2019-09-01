import React, { FC, useRef } from 'react'
import { useStep } from '../../hooks/useStep'
import { StepProps } from '../../types/StepProps'

interface TextProps extends StepProps {}

export const Fade: FC<TextProps> = props => {
    const ref = useRef(null)

    useStep(
        props.in,
        (timeline, { duration, ease }) => {
            timeline.to(ref.current!, duration.normal, {
                opacity: 1,
                ease,
            })
        },
        { title: '→Fade' },
    )

    useStep(
        props.out,
        (timeline, { duration, ease }) => {
            timeline.to(ref.current!, duration.normal, {
                opacity: 0,
                ease,
            })
        },
        { title: '←Fade' },
    )

    return (
        <div ref={ref} style={{ opacity: 0 }}>
            {props.children}
        </div>
    )
}
