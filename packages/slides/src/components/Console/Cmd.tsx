import React, { FC, useRef } from 'react'
import styled from 'styled-components'
import { useElementSize } from '../../hooks/useElementSize'
import { useStep } from '../../hooks/useStep'
import { trail, fromTo, val, set } from 'light-trails'

interface CmdProps {
    name: string
    in: number
}

export const Cmd: FC<CmdProps> = props => {
    const ref = useRef(null)
    const size = useElementSize(ref)

    useStep(
        props.in,
        ({ duration }) =>
            trail(ref.current!, [
                set({ width: [0, 0], opacity: [0, 0] }),
                fromTo({ height: val(0, size!.height, 'px') }, duration.normal),
                fromTo(
                    {
                        width: val(0, size!.width, 'px'),
                        opacity: val(0, 1),
                    },
                    duration.normal,
                ),
            ]),
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
