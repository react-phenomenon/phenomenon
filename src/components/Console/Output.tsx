import React, { FC, useEffect, useRef, useState } from 'react'
import useComponentSize from '@rehooks/component-size'
import styled from 'styled-components'
import { useSlides } from '../../hooks/useSlides'
import { stripIndent } from '../../helpers/stripIndent'

interface OutputProps {
    text: string
    in: number
}

export const Output: FC<OutputProps> = props => {
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
            height: [0, height],
            opacity: [0, 1],
        })
    }, [height, size, addedStep])

    return (
        <Container ref={ref} style={{ opacity: 0, height: size ? 0 : undefined }}>
            <Code>{stripIndent(props.text).trim()}</Code>
        </Container>
    )
}

const Container = styled.div`
    overflow: hidden;
`

const Code = styled.pre`
    white-space: pre-wrap;
    padding: 0.3em;
    margin: 0;
`
