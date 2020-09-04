import React, { FC, useRef } from 'react'
import styled from 'styled-components'
import { useElementSize } from '../../hooks/useElementSize'
import { useStep } from '../../hooks/useStep'
import { trail, fromTo, val, set, text, sequence, delay } from 'light-trails'

interface CmdProps {
    name: string
    in: number
}

export const Cmd: FC<CmdProps> = props => {
    const ref = useRef(null)
    const textRef = useRef(null)
    const cursorRef = useRef(null)
    const size = useElementSize(ref)

    useStep(
        props.in,
        ({ duration }) =>
            sequence([
                trail(ref.current!, [
                    fromTo({ height: val(0, size!.height, 'px') }, duration.normal),
                ]),
                trail(textRef.current!, [
                    delay(duration.normal),
                    fromTo({ text: text(props.name) }, duration.normal),
                ]),
                trail(cursorRef.current!, [
                    fromTo({ opacity: val(1, 0) }, duration.fast),
                ]),
            ]),
        { title: 'Cmd', deps: [size !== null] },
    )

    return (
        <Container ref={ref}>
            <Line>
                <Prompt>➜</Prompt>
                <span ref={textRef} />
                <Cursor ref={cursorRef} />
            </Line>
        </Container>
    )
}

const Container = styled.div`
    overflow: hidden;
    white-space: nowrap;
    line-height: 1.4;
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

const Cursor = styled.span`
    display: inline-block;
    background-color: rgba(255, 255, 255, 0.8);
    height: 1.4em;
    width: 0.5em;
    vertical-align: middle;
    margin-left: 0.2em;
`
