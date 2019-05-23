import React, { FC, useContext, useRef, useEffect } from 'react'

import { TimelineContext } from '../../lib/Timeline'
import { SubStepsContext } from '../SubSteps'

export const Text: FC<{ in: number; out?: number }> = props => {
    const subId = useContext(SubStepsContext)
    const timeline = useContext(TimelineContext)
    const ref = useRef(null)

    useEffect(() => {
        timeline.addStep([...subId, props.in], () => {
            return {
                targets: ref.current,
                easing: 'easeInOutQuad',
                opacity: [0, 1],
            }
        })

        if (props.out) {
            timeline.addStep([...subId, -props.out], () => {
                return {
                    targets: ref.current,
                    easing: 'easeInOutQuad',
                    keyframes: [
                        { opacity: 0 },
                        {
                            height: 0,
                            margin: 0,
                            padding: 0
                        }
                    ],
                }
            })
        }
    }, [])

    return <p ref={ref}>{props.children}</p>
}
