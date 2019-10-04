import React, { FC, useEffect, useRef, useState, Children, ReactElement } from 'react'
import styled, { keyframes } from 'styled-components'
import { ConfigContext } from '../../lib/Config'
import { Timeline, TimelineContext } from '../../lib/Timeline'
import { Config } from '../../types/Config'
import { Controls } from '../Controls'
import { SlideProps } from '../Slide'

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

    const childrenArray = Children.toArray<ReactElement<SlideProps>>(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        children as any,
    )

    return (
        <Wrapper
            style={{
                backgroundColor: config.backgroundColor,
            }}
        >
            {rdy ? (
                <>
                    {!inRenderMode && <Controls timeline={timeline} />}
                    {inRenderMode && (
                        <div id="duration" style={{ display: 'none' }}>
                            {timeline.getDuration()}
                        </div>
                    )}
                </>
            ) : (
                <Loading />
            )}
            <ConfigContext.Provider value={config}>
                <TimelineContext.Provider value={timeline}>
                    <SlidesContainer
                        style={{
                            backgroundColor: config.backgroundColor,
                            backgroundImage: `url(${config.backgroundImage})`,
                            opacity: rdy ? 1 : 0,
                        }}
                    >
                        {childrenArray.map((child, index) => (
                            <child.type key={index} start={index + 1} {...child.props} />
                        ))}
                    </SlidesContainer>
                </TimelineContext.Provider>
            </ConfigContext.Provider>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    height: 100%;
`

const grow = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
`

const height = 7

const Loading = styled.div`
    position: absolute;
    top: calc(50% - 5px);
    left: 40vw;
    right: 40vw;
    height: ${height}px;
    border-radius: ${height}px;
    background: rgba(0, 0, 0, 0.3);

    &::after {
        content: '';
        display: block;
        width: 40%;
        border-radius: ${height}px;
        height: 100%;
        background: rgba(255, 255, 255, 0.8);
        animation: 1.5s ${grow} ease-out both;
    }
`

const SlidesContainer = styled.div`
    height: 100%;
    transition: opacity 0.2s ease;
`
