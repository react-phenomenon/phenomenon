import React, { FC, useRef } from 'react'
import styled from 'styled-components'
import { stripIndent } from '../../helpers/stripIndent'
import { useElementSize } from '../../hooks/useElementSize'
import { useStep } from '../../hooks/useStep'

interface OutputProps {
    text: string
    in: number
}

export const Output: FC<OutputProps> = props => {
    const ref = useRef(null)
    const size = useElementSize(ref)

    useStep(
        props.in,
        (timeline, { duration, ease }) => {
            timeline.fromTo(
                ref.current!,
                duration.normal,
                { opacity: 0, height: 0 },
                { opacity: 1, height: size!.height, ease },
            )
        },
        { title: 'Output', deps: [size !== null] },
    )

    return (
        <Container ref={ref}>
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
