import React, { FC, useRef } from 'react'
import styled from 'styled-components'
import { useElementSize } from '../../hooks/useElementSize'
import { useStep } from '../../hooks/useStep'

interface CmdProps {
    name: string
    in: number
}

export const Cmd: FC<CmdProps> = props => {
    const ref = useRef(null)
    const size = useElementSize(ref)

    useStep(
        props.in,
        (timeline, { duration, ease }) => {
            const el = ref.current!
            timeline
                .fromTo(
                    el,
                    duration.fast,
                    { height: 0, width: 0, opacity: 0 },
                    { height: size!.height, ease },
                )
                .to(el, duration.fast, {
                    opacity: 1,
                    width: '100%',
                    ease,
                })
        },
        { title: 'Cmd', deps: [size !== null] },
    )

    return (
        <Container ref={ref}>
            <Line>
                <Prompt>➜</Prompt>
                {props.name}
            </Line>
        </Container>
    )
}

const Container = styled.div`
    overflow: hidden;
    white-space: nowrap;
`

const Line = styled.div`
    background-color: rgba(255, 255, 255, 0.05);
    padding: 0.2em 0.3em;
    border-radius: 0.2em;
    margin-top: 1em;
`

const Prompt = styled.span`
    color: #abc123;
    padding-right: 0.5em;
    font-weight: bold;
`
