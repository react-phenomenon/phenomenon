import React, { FC, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useSlides } from '../../hooks/useSlides'
import { useElementSize } from '../../hooks/useElementSize'

interface CmdProps {
    name: string
    in: number
}

export const Cmd: FC<CmdProps> = props => {
    const ref = useRef(null)

    const size = useElementSize(ref)
    const [addedStep, setAddedStep] = useState(false)
    const { addStep } = useSlides()

    useEffect(() => {
        if (!size || addedStep) return

        setAddedStep(true)

        addStep(
            props.in,
            {
                targets: ref.current,
                keyframes: [
                    {
                        height: size.height,
                        width: '0%',
                    },
                    {
                        opacity: 1,
                        width: '100%',
                    },
                ],
            },
            { title: 'Cmd' },
        )
    }, [size, addedStep])

    return (
        <Container ref={ref} style={{ opacity: 0, height: size ? 0 : undefined }}>
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
