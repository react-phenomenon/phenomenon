import React, { FC, PropsWithChildren, useContext, useRef } from 'react'
import styled from 'styled-components'
import { useStep } from '../../hooks/useStep'
import { ConfigContext } from '../../lib/Config'
import { Config } from '../../types/Config'
import { SubSteps } from '../SubSteps'

interface SlideProps {
    config?: Partial<Config>
}

export interface SlideFilledProps extends SlideProps {
    index: number
}

export const Slide: FC<SlideProps> = props => {
    const filledProps = props as PropsWithChildren<SlideFilledProps>
    const { index, children, config: slideConfig } = filledProps

    const baseConfig = useContext(ConfigContext)
    const config = { ...baseConfig, ...slideConfig }

    const contentRef = useRef<HTMLDivElement>(null)
    const backgroundRef = useRef<HTMLDivElement>(null)

    useStep(
        index,
        (timeline, { duration, ease }) => {
            timeline
                .to(backgroundRef.current!, duration.slow, {
                    opacity: 1,
                    ease,
                })
                .to(
                    contentRef.current!,
                    duration.slow,
                    {
                        opacity: 1,
                        x: 0,
                        ease,
                    },
                    `-=${duration}`,
                )
        },
        { title: '→Slide', animateWithNext: true },
    )

    useStep(
        -index,
        (timeline, { duration, ease }) => {
            timeline
                .to(backgroundRef.current!, duration.slow, {
                    opacity: 0,
                    ease,
                })
                .to(
                    contentRef.current!,
                    duration.slow,
                    {
                        opacity: 0,
                        x: '-100%',
                        ease,
                    },
                    `-=${duration}`,
                )
        },
        { title: '←Slide' },
    )

    return (
        <SubSteps id={[index]}>
            <Background
                ref={backgroundRef}
                style={{
                    backgroundColor: config.backgroundColor,
                    backgroundImage: `url(${config.backgroundImage})`,
                    opacity: 0,
                }}
            >
                <Content
                    ref={contentRef}
                    style={{
                        transform: 'translateX(100%)',
                        opacity: 0,
                    }}
                >
                    <div>{children}</div>
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
