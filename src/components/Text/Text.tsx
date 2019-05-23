import React, { FC, useContext, useRef, useEffect } from 'react'

import { TimelineContext } from '../../lib/Timeline'
import { SubStepsContext } from '../SubSteps'

export const Text: FC<{ in: number; out?: number }> = props => {
    const subId = useContext(SubStepsContext)
    const timeline = useContext(TimelineContext)
    const ref = useRef(null)

    useEffect(() => {
        timeline.addStep({
            id: [...subId, props.in],
            params: () => {
                return {
                    targets: ref.current,
                    opacity: [0, 1],
                }
            },
        })

        if (props.out) {
            timeline.addStep({
                id: [...subId, -props.out],
                params: () => {
                    return {
                        targets: ref.current,
                        keyframes: [
                            { opacity: 0 },
                            {
                                height: 0,
                                margin: 0,
                                padding: 0,
                            },
                        ],
                    }
                },
            })
        }
    }, [])

    return <p ref={ref}>{props.children}</p>
}
