import React, { FC, useRef } from 'react'
import { useStep } from '../../hooks/useStep'
import { StepProps } from '../../types/StepProps'
import { OperatorFunction, animate } from '@phenomenon/lightning'

interface AnimateProps extends StepProps {
    anim: OperatorFunction[]
    exitAnim?: OperatorFunction[]
}

export const Animate: FC<AnimateProps> = props => {
    const { anim, exitAnim } = props
    const ref = useRef(null)

    useStep(props.in, () => animate(ref.current!, anim), { title: '→Animate' })

    const hasExit = exitAnim && props.out

    useStep(hasExit ? props.out : undefined, () => animate(ref.current!, exitAnim!), {
        title: '←Animate',
    })

    return <div ref={ref}>{props.children}</div>
}
