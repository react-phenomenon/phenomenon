import React, { FC, useRef } from 'react'
import { useStep } from '../../hooks/useStep'
import { StepProps } from '../../types/StepProps'

interface TextProps extends StepProps {}

export const Fade: FC<TextProps> = props => {
    const ref = useRef(null)

    useStep(props.in, timeline => {
        timeline.to(ref.current!, 0.4, {
            opacity: 1,
        })
    })

    useStep(props.out, timeline => {
        timeline.to(ref.current!, 0.4, {
            opacity: 0,
        })
    })

    return (
        <div ref={ref} style={{ opacity: 0 }}>
            {props.children}
        </div>
    )
}
