import React, { FC, useRef } from 'react'
import styled from 'styled-components'
import { useStep } from '../../hooks/useStep'
import { StepProps } from '../../types/StepProps'
import { FragFC } from './types/FragFC'

interface MarkProps extends StepProps {
    line: number
}

export const Mark: FragFC<MarkProps> = props => {
    const ref = useRef<HTMLDivElement>(null)

    useStep(
        props.in,
        (timeline, { duration, ease }) => {
            timeline.fromTo(
                ref.current!,
                duration.normal,
                { opacity: 0 },
                { opacity: 1, ease },
            )
        },
        { title: '→Mark' },
    )

    useStep(
        props.out,
        (timeline, { duration, ease }) => {
            timeline.to(ref.current!, duration.normal, { opacity: 0, ease })
        },
        { title: '→Mark' },
    )

    return (
        <Marker ref={ref} style={{ top: `${(props.line - 1) * 1.5}em` }}>
            {' '}
        </Marker>
    )
}

Mark._type = 'mark'

const Marker = styled.mark`
    position: absolute;
    right: -2px;
    left: -2px;
    outline: 1px dotted yellow;
    border-radius: 5px;
    background: transparent;
    pointer-events: none;
`
