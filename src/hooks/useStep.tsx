import { Power2, TimelineMax, Ease } from 'gsap'
import { useContext, useEffect } from 'react'
import { SubStepsContext } from '../components/SubSteps'
import { TimelineContext, TimelineOptions } from '../lib/Timeline'

interface Durations {
    fast: number
    normal: number
    slow: number
}

interface DefaultOptions {
    ease: Ease
    duration: Durations
}

const defaultOptions: DefaultOptions = {
    ease: Power2.easeInOut,
    duration: {
        fast: 0.3,
        normal: 0.4,
        slow: 0.8,
    },
}

export const useStep = (
    index?: number,
    createTween?: (tween: TimelineMax, defaultOptions: DefaultOptions) => void,
    options: TimelineOptions = {},
) => {
    const timeline = useContext(TimelineContext)
    const subId = useContext(SubStepsContext)
    const { deps = [] } = options

    useEffect(() => {
        if (index === undefined || !createTween || !deps.every(d => d)) return

        timeline.addStep({
            id: [...subId, index],
            createStepTimeline: stepTimeline => createTween(stepTimeline, defaultOptions),
            options,
        })
    }, deps)
}
