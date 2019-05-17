import React, { useEffect, FC, useContext, useRef } from "react";
import { TimelineContext } from "../../lib/Timeline";

export const Slide: FC<{ i: number }> = props => {
    const timeline = useContext(TimelineContext)
    const ref = useRef(null)

    useEffect(() => {
        timeline.addStep([props.i], (tl: any) => {
            tl.add({
                targets: ref.current,
                easing: 'easeInOutQuad',
                opacity: [0, 1],
            })
        })
        timeline.addStep([-props.i], (tl: any) => {
            tl.add({
                targets: ref.current,
                easing: 'easeInOutQuad',
                opacity: [1, 0],
            })
        })
    }, [])

    return <div ref={ref}>{props.children}</div>
}