import React, { FC, useEffect, useRef, useState } from 'react'
import { Timeline, TimelineContext } from '../../lib/Timeline'
import { Controls } from '../Controls'

const WINDOW = window as any
const renderMode: boolean = WINDOW.__RENDER__

export const Deck: FC = props => {
    const timelineRef = useRef(new Timeline())
    const timeline = timelineRef.current
    const [rdy, setRdy] = useState(false)

    if (renderMode) {
        WINDOW.__TIMELINE = timeline
    }

    useEffect(() => {
        timeline.onRegister(() => {
            setRdy(true)
        })
    }, [])

    return (
        <>
            {rdy && (
                <>
                    {!renderMode && <Controls timeline={timeline} />}
                    {renderMode && (
                        <div id="duration" style={{ display: 'none' }}>
                            {timeline.getDuration()}
                        </div>
                    )}
                </>
            )}
            <TimelineContext.Provider value={timeline}>
                {props.children}
            </TimelineContext.Provider>
        </>
    )
}
