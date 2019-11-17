import React, { FC, useRef } from 'react'
import { useStep } from '../../hooks/useStep'
import { StepProps } from '../../types/StepProps'

interface AnimateProps extends StepProps {
    from: any
    to: any
    exit?: any
}

export const Animate: FC<AnimateProps> = props => {
    const { from, to, exit } = props
    const ref = useRef(null)

    useStep(
        props.in,
        (timeline, { duration, ease }) => {
            timeline.fromTo(ref.current!, duration.normal, from, {
                ...to,
                ease,
            })
        },
        { title: '→Animate' },
    )

    const hasExit = exit && props.out

    useStep(
        hasExit ? props.out : undefined,
        (timeline, { duration, ease }) => {
            timeline.to(ref.current!, duration.normal, {
                ...exit,
                ease,
            })
        },
        { title: '←Animate' },
    )

    return <div ref={ref}>{props.children}</div>
}
