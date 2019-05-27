import { AnimeAnimParams } from 'animejs'
import { useCallback, useContext } from 'react'
import { SubStepsContext } from '../components/SubSteps'
import { TimelineContext, TimelineOptions } from '../lib/Timeline'

export const useSlides = () => {
    const timeline = useContext(TimelineContext)
    const subId = useContext(SubStepsContext)

    const addStep = useCallback(
        (index: number, params: AnimeAnimParams, options?: TimelineOptions) => {
            timeline.addStep({
                id: [...subId, index],
                params,
                options,
            })
        },
        [timeline, subId],
    )

    return { addStep }
}
