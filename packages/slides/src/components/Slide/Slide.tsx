import React, { FC, useContext, useRef } from 'react'
import styled from 'styled-components'
import { useStep } from '../../hooks/useStep'
import { ConfigContext } from '../../lib/Config'
import { Config } from '../../types/Config'
import { SubStepsProps } from '../../types/SubStepsProps'
import { SubSteps } from '../SubSteps'

export interface SlideProps extends SubStepsProps {
    config?: Partial<Config>
}

const inactiveZIndex = 1
const activeZIndex = 2

export const Slide: FC<SlideProps> = props => {
    const baseConfig = useContext(ConfigContext)
    const config = { ...baseConfig, ...props.config }

    const contentRef = useRef<HTMLDivElement>(null)
    const backgroundRef = useRef<HTMLDivElement>(null)

    useStep(
        props.start === 1 ? undefined : props.start, // Skip first slide enter animation
        (timeline, { duration, ease }) => {
            timeline
                .set(contentRef.current!, { zIndex: inactiveZIndex })
                .fromTo(
                    backgroundRef.current!,
                    duration.slow,
                    { opacity: 0 },
                    { opacity: 1, ease },
                )
                .fromTo(
                    contentRef.current!,
                    duration.slow,
                    { opacity: 0, scale: 0.8 },
                    { opacity: 1, scale: 1, ease },
                    `-=${duration.slow}`,
                )
                .set(contentRef.current!, { zIndex: activeZIndex })
        },
        { title: '→Slide', animateWithNext: true },
    )

    useStep(
        -props.start!,
        (timeline, { duration, ease }) => {
            timeline
                .to(backgroundRef.current!, duration.slow, {
                    opacity: 0,
                    ease,
                })
                .to(
                    contentRef.current!,
                    duration.slow,
                    { opacity: 0, x: '-100%', ease },
                    `-=${duration.slow}`,
                )
                .set(contentRef.current!, { zIndex: inactiveZIndex })
        },
        { title: '←Slide' },
    )

    return (
        <SubSteps start={props.start} unwrap={props.unwrap}>
            <Background
                ref={backgroundRef}
                style={{
                    backgroundColor: config.backgroundColor,
                    backgroundImage: `url(${config.backgroundImage})`,
                }}
            >
                <Content ref={contentRef} style={{ zIndex: inactiveZIndex }}>
                    <div>{props.children}</div>
                </Content>
            </Background>
        </SubSteps>
    )
}

const Background = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;
    pointer-events: none;
    background-position: center center;
    background-size: cover;
`

const Content = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: all;
    padding: 20px 0;
    max-height: 100vh;
    overflow: auto;
`
