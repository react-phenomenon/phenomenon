import React, { useEffect, FC, useContext, useRef } from 'react'
import { TimelineContext } from '../../lib/Timeline'
import { SubSteps } from '../SubSteps'

export const Slide: FC<{ index: number }> = props => {
    const timeline = useContext(TimelineContext)
    const ref = useRef(null)

    useEffect(() => {
        timeline.addStep([props.index], () => {
            return {
                targets: ref.current,
                easing: 'easeInOutQuad',
                opacity: [0, 1],
            }
        })
        timeline.addStep([-props.index, 0], () => {
            return {
                targets: ref.current,
                easing: 'easeInOutQuad',
                opacity: [1, 0],
            }
        })
    }, [])

    return (
        <SubSteps id={[props.index]}>
            <div ref={ref}>{props.children}</div>
        </SubSteps>
    )
}
