import React, { FC, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { SubSteps } from '../SubSteps'
import { useSlides } from '../../hooks/useSlides'

interface SlideProps {
    index: number
}

export const Slide: FC<SlideProps> = props => {
    const { addStep } = useSlides()
    const ref = useRef<HTMLDivElement>(null)

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
        addStep(-props.index, {
            targets: ref.current,
            opacity: [1, 0],
            translateX: '-100%',
        })
    }, [])

    return (
        <SubSteps id={[props.index]}>
            <Wrapper>
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
