import React, { FC, useEffect, useRef, useContext, PropsWithChildren } from 'react'
import styled from 'styled-components'
import { SubSteps } from '../SubSteps'
import { useSlides } from '../../hooks/useSlides'
import { ConfigContext } from '../../lib/Config'
import { Config } from '../../types/Config'
import { useStep } from '../../hooks/useStep'

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
        timeline => {
            timeline
                .to(backgroundRef.current!, 0.4, {
                    opacity: 1,
                })
                .to(
                    contentRef.current!,
                    0.4,
                    {
                        opacity: 1,
                        x: 0,
                    },
                    '-=0.4',
                )
        },
        { offset: true },
    )

    useStep(-index, timeline => {
        timeline
            .to(backgroundRef.current!, 0.4, {
                opacity: 0,
            })
            .to(
                contentRef.current!,
                0.4,
                {
                    opacity: 0,
                    x: '-100%',
                },
                '-=0.4',
            )
    })

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
