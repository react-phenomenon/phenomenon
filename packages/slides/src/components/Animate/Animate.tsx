import React, { FC, useRef } from 'react'
import { useStep } from '../../hooks/useStep'
import { StepProps } from '../../types/StepProps'
import { TrailFunction, trail } from 'light-trails'

interface AnimateProps extends StepProps {
    anim: TrailFunction[]
    exitAnim?: TrailFunction[]
}

export const Animate: FC<AnimateProps> = props => {
    const { anim, exitAnim } = props
    const ref = useRef(null)

    useStep(props.in, () => trail(ref.current!, anim), { title: '→Animate' })

    const hasExit = exitAnim && props.out

    useStep(hasExit ? props.out : undefined, () => trail(ref.current!, exitAnim!), {
        title: '←Animate',
    })

    return <div ref={ref}>{props.children}</div>
}
