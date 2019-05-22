import React, { FC, useEffect, useRef, useState } from 'react';
import { Timeline, TimelineContext } from '../../lib/Timeline';
import { Controls } from '../Controls';

export const Deck: FC = props => {
    const timelineRef = useRef(new Timeline())
    const timeline = timelineRef.current
    const [rdy, setRdy] = useState(false)

    useEffect(() => {
        timeline.onRegister(() => {
            setRdy(true)
        })
    }, [])

    return (
        <div>
            {rdy && <Controls timeline={timeline} />}
            <TimelineContext.Provider value={timeline}>{props.children}</TimelineContext.Provider>
        </div>
    )
}
