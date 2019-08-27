import { TimelineMax } from 'gsap'
import { useContext, useEffect, useLayoutEffect } from 'react'
import { SubStepsContext } from '../components/SubSteps'
import { TimelineContext, TimelineOptions } from '../lib/Timeline'

export const useStep = (
    index?: number,
    createTween?: (tween: TimelineMax) => void,
    options?: TimelineOptions,
) => {
    const timeline = useContext(TimelineContext)
    const subId = useContext(SubStepsContext)

    useEffect(() => {
        if (index === undefined || !createTween) return
        timeline.addStep({
            id: [...subId, index],
            createStepTimeline: stepTimeline => createTween(stepTimeline),
            options,
        })
    }, [])
}
