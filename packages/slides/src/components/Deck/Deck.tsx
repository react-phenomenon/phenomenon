import React, { Children, FC, ReactElement, useEffect, useMemo, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { inRenderMode } from '../../env'
import { ConfigContext } from '../../lib/Config'
import { Timeline, TimelineContext } from '../../lib/Timeline'
import { Config } from '../../types/Config'
import { Controls } from '../Controls'
import { SlideProps } from '../Slide'

interface DeckProps {
    config?: Partial<Config>
}

export const Deck: FC<DeckProps> = ({ children, config = {} }) => {
    const timeline = useMemo(() => new Timeline(), [])
    const [rdy, setRdy] = useState(false)

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(window as any).__TIMELINE = timeline

        timeline.onRegister(() => {
            setRdy(true)
        })
    }, [timeline])

    const childrenArray = Children.toArray<ReactElement<SlideProps>>(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        children as any,
    )

    const duration = timeline.getDuration()

    return (
        <Wrapper
            style={{
                backgroundColor: config.backgroundColor,
            }}
        >
            {!inRenderMode && <Controls timeline={timeline} />}
            {inRenderMode && duration && (
                <div id="duration" style={{ display: 'none' }}>
                    {timeline.getDuration()}
                </div>
            )}
            {rdy || <Loading />}
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
        animation: 1s ${grow} ease-out both;
    }
`

const SlidesContainer = styled.div`
    height: 100%;
    transition: opacity 0.2s ease;
`
