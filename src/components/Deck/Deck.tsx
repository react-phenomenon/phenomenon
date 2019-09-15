import React, { FC, useEffect, useRef, useState, Children, ReactElement } from 'react'
import styled from 'styled-components'
import { ConfigContext } from '../../lib/Config'
import { Timeline, TimelineContext } from '../../lib/Timeline'
import { Config } from '../../types/Config'
import { Controls } from '../Controls'
import { SlideFilledProps } from '../Slide'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WINDOW = window as any
const inRenderMode: boolean = WINDOW.__RENDER__

interface DeckProps {
    config?: Partial<Config>
}

export const Deck: FC<DeckProps> = props => {
    const { children, config = {} } = props

    const timelineRef = useRef(new Timeline())
    const timeline = timelineRef.current

    const [rdy, setRdy] = useState(false)

    // if (inRenderMode) {
    WINDOW.__TIMELINE = timeline
    // }

    useEffect(() => {
        timeline.onRegister(() => {
            setRdy(true)
        })
    }, [timeline])

    const childrenArray = Children.toArray<ReactElement<SlideFilledProps>>(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        children as any,
    )

    return (
        <>
            {rdy && (
                <>
                    {!inRenderMode && <Controls timeline={timeline} />}
                    {inRenderMode && (
                        <div id="duration" style={{ display: 'none' }}>
                            {timeline.getDuration()}
                        </div>
                    )}
                </>
            )}
            <ConfigContext.Provider value={config}>
                <TimelineContext.Provider value={timeline}>
                    <Container
                        style={{
                            backgroundColor: config.backgroundColor,
                            backgroundImage: `url(${config.backgroundImage})`,
                        }}
                    >
                        {childrenArray.map((child, index) => (
                            <child.type key={index} index={index + 1} {...child.props} />
                        ))}
                    </Container>
                </TimelineContext.Provider>
            </ConfigContext.Provider>
        </>
    )
}

const Container = styled.div`
    height: 100%;
`
