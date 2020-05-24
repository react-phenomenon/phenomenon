import React, { useRef } from 'react'
import styled from 'styled-components'
import { useStep } from '../../hooks/useStep'
import { StepProps } from '../../types/StepProps'
import { FragFC } from './types/FragFC'
import { trail, fromTo, val } from 'light-trails'
import { size } from 'lodash'

interface MarkProps extends StepProps {
    line: number
}

export const Mark: FragFC<MarkProps> = props => {
    const ref = useRef<HTMLDivElement>(null)

    useStep(
        props.in,
        ({ duration }) =>
            trail(ref.current!, [fromTo({ opacity: val(0, 1) }, duration.normal)]),
        { title: '→Mark' },
    )

    useStep(
        props.out,
        ({ duration }) =>
            trail(ref.current!, [fromTo({ opacity: val(1, 0) }, duration.normal)]),
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
