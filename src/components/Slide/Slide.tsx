import React, { FC, useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'
import { SubSteps } from '../SubSteps'
import { useSlides } from '../../hooks/useSlides'
import { ConfigContext } from '../../lib/Config'

interface SlideProps {
    index: number
    backgroundColor?: string
    backgroundImage?: string
}

export const Slide: FC<SlideProps> = props => {
    const { index, children, ...slideConfig } = props

    const { addStep } = useSlides()
    const baseConfig = useContext(ConfigContext)
    const config = { ...baseConfig, ...slideConfig }

    const ref = useRef<HTMLDivElement>(null)
    const ref2 = useRef<HTMLDivElement>(null)

    useEffect(() => {
        addStep(
            props.index,
            {
                targets: ref.current,
                opacity: [0, 1],
                translateX: ['100%', 0],
            },
            { title: 'Slide', offset: true },
        )

        addStep(
            props.index,
            {
                targets: ref2.current,
                opacity: [0, 1],
            },
            { offset: true },
        )

        addStep(-props.index, {
            targets: ref.current,
            opacity: [1, 0],
            translateX: '-100%',
        })

        addStep(-props.index, {
            targets: ref2.current,
            opacity: [1, 0],
        })
    }, [])

    return (
        <SubSteps id={[index]}>
            <Wrapper
                ref={ref2}
                style={{
                    backgroundColor: config.backgroundColor,
                    backgroundImage: `url(${config.backgroundImage})`,
                }}
            >
                <Content ref={ref}>
                    <div>{props.children}</div>
                </Content>
            </Wrapper>
        </SubSteps>
    )
}

const Wrapper = styled.div`
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
`
