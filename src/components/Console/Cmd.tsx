import React, { FC, useEffect, useRef, useState } from 'react'
import useComponentSize from '@rehooks/component-size'
import styled from 'styled-components'
import { useSlides } from '../../hooks/useSlides'

type CmdProps = {
    name: string
    in: number
}

export const Cmd: FC<CmdProps> = props => {
    const ref = useRef(null)

    const { height } = useComponentSize(ref)
    const [size, saveSize] = useState<number | null>(null)
    const [addedStep, setAddedStep] = useState(false)
    const { addStep } = useSlides()

    useEffect(() => {
        if (height && !size) {
            saveSize(height)
        }

        if (!size || addedStep) return

        setAddedStep(true)

        addStep(props.in, {
            targets: ref.current,
            keyframes: [
                {
                    height: size,
                    width: '0%',
                },
                {
                    opacity: 1,
                    width: '100%',
                },
            ],
        })
    }, [height, size, addedStep])

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
