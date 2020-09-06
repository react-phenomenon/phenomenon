import React, { FC, useContext, useRef } from 'react'
import styled from 'styled-components'
import { useStep } from '../../hooks/useStep'
import { ConfigContext } from '../../lib/Config'
import { Config } from '../../types/Config'
import { SubStepsProps } from '../../types/SubStepsProps'
import { SubSteps } from '../SubSteps'
import { trail, set, fromTo, val, parallel } from 'light-trails'

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
        ({ duration }) => {
            const contentFrames = trail(contentRef.current!, [
                set({ zIndex: [undefined, inactiveZIndex] }),
                fromTo(
                    {
                        opacity: val(0, 1),
                        scale: val(0.8, 1),
                    },
                    duration.slow,
                ),
                set({ zIndex: [inactiveZIndex, activeZIndex] }),
            ])

            const bgFrames = trail(backgroundRef.current!, [
                fromTo({ opacity: val(0, 1) }, duration.slow),
            ])

            return parallel([contentFrames, bgFrames])
        },
        { title: '→Slide', animateWithNext: true },
    )

    useStep(
        -props.start!,
        ({ duration }) => {
            const contentFrames = trail(contentRef.current!, [
                fromTo(
                    {
                        opacity: val(1, 0),
                        x: val(0, -100, '%'),
                    },
                    duration.slow,
                ),
                set({ zIndex: [activeZIndex, inactiveZIndex] }),
            ])

            const bgFrames = trail(backgroundRef.current!, [
                fromTo({ opacity: val(1, 0) }, duration.slow),
            ])

            return parallel([contentFrames, bgFrames])
        },
        { title: '←Slide' },
    )

    return (
        <SubSteps start={props.start} unwrap={props.unwrap}>
            <Background
                ref={backgroundRef}
                style={{
                    backgroundColor: config.backgroundColor,
                    backgroundImage:
                        config.backgroundImage && `url(${config.backgroundImage})`,
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
