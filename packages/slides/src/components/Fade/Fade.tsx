import React, { FC, useRef } from 'react'
import { useStep } from '../../hooks/useStep'
import { StepProps } from '../../types/StepProps'
import { animate, fromTo, val } from '@phenomenon/lightning'

interface TextProps extends StepProps {}

export const Fade: FC<TextProps> = props => {
    const ref = useRef(null)

    useStep(
        props.in,
        ({ duration }) =>
            animate(ref.current!, [fromTo({ opacity: val(0, 1) }, duration.normal)]),
        { title: '→Fade' },
    )

    useStep(
        props.out,
        ({ duration }) =>
            animate(ref.current!, [fromTo({ opacity: val(1, 0) }, duration.normal)]),
        { title: '←Fade' },
    )

    return <div ref={ref}>{props.children}</div>
}
