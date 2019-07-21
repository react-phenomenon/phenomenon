import React, { FC, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useSlides } from '../../hooks/useSlides'
import { StepProps } from '../../types/StepProps'

interface MarkProps extends StepProps {
    line: number
}

interface MarkFC<P> extends FC<P> {
    _inline: boolean
}

export const Mark: MarkFC<MarkProps> = props => {
    const ref = useRef<HTMLDivElement>(null)
    const { addStep } = useSlides()

    useEffect(() => {
        if (props.in) {
            addStep(
                props.in,
                {
                    targets: ref.current,
                    opacity: [0, 1],
                },
                { title: 'Mark' },
            )

            if (props.out) {
                addStep(
                    props.out,
                    {
                        targets: ref.current,
                        opacity: 0,
                    },
                    { title: 'Mark out' },
                )
            }
        }
    }, [])

    return (
        <Marker ref={ref} style={{ top: `${(props.line - 1) * 1.5}em` }}>
            {' '}
        </Marker>
    )
}

// This will differentiate this component from the <Frag />
Mark._inline = true

const Marker = styled.mark`
    position: absolute;
    right: -2px;
    left: -2px;
    outline: 1px dotted yellow;
    border-radius: 5px;
    background: transparent;
    pointer-events: none;
`
