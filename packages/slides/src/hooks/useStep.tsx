import { useContext, useEffect } from 'react'
import { FramesFunction } from '@phenomenon/lightning'
import { SubStepsContext } from '../components/SubSteps'
import { TimelineContext, TimelineOptions } from '../lib/Timeline'

interface Durations {
    fast: number
    normal: number
    slow: number
}

interface DefaultOptions {
    // ease: Ease
    duration: Durations
}

const defaultOptions: DefaultOptions = {
    duration: {
        fast: 300,
        normal: 400,
        slow: 800,
    },
}

export const useStep = (
    index?: number,
    getFrames?: (defaultOptions: DefaultOptions) => FramesFunction,
    options: TimelineOptions = {},
) => {
    const timeline = useContext(TimelineContext)
    const subId = useContext(SubStepsContext)
    const { deps = [] } = options

    useEffect(() => {
        if (index === undefined || !getFrames || !deps.every(d => d)) return

        timeline.addStep({
            id: [...subId, index],
            getStepFrames: () => getFrames(defaultOptions),
            options,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
}
