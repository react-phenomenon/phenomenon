import React, { FC, useRef, useEffect } from 'react'
import { SubSteps } from '../SubSteps'
import { useSlides } from '../../hooks/useSlides'
import styled from 'styled-components'

type ConsoleProps = {
    in: number
    out?: number
}

export const Console: FC<ConsoleProps> = props => {
    const ref = useRef(null)
    const { addStep } = useSlides()

    useEffect(() => {
        addStep(
            props.in,
            {
                targets: ref.current,
                opacity: [0, 1],
                translateX: [250, 0],
            },
            { title: 'Console' },
        )

        if (props.out) {
            addStep(-props.out, {
                targets: ref.current,
                keyframes: [
                    { opacity: 0 },
                    {
                        height: 0,
                        margin: 0,
                        padding: 0,
                    },
                ],
            })
        }
    }, [])

    return (
        <SubSteps id={[props.in]}>
            <Container ref={ref}>
                <Scroll>{props.children}</Scroll>
            </Container>
        </SubSteps>
    )
}

const Container = styled.div`
    overflow: hidden;
    position: relative;
    width: 500px;
    max-width: 100%;
    height: 300px;
    background-color: #20242b;
    padding: 2em;
    margin: 2em auto;
    border-radius: 0.5em;
`

const Scroll = styled.div`
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 10px;
`
