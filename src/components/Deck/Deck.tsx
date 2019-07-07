import React, { FC, useEffect, useRef, useState, createContext } from 'react'
import { Timeline, TimelineContext } from '../../lib/Timeline'
import { Controls } from '../Controls'
import { Config } from '../../types/Config'
import { ConfigContext } from '../../lib/Config'

const WINDOW = window as any
const renderMode: boolean = WINDOW.__RENDER__

interface DeckProps {
    config?: Partial<Config>
}

export const Deck: FC<DeckProps> = props => {
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
            <ConfigContext.Provider value={props.config || {}}>
                <TimelineContext.Provider value={timeline}>
                    {props.children}
                </TimelineContext.Provider>
            </ConfigContext.Provider>
        </>
    )
}
