import React, { FC, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useSlides } from '../../hooks/useSlides'
import { StepProps } from '../../types/StepProps'
import { useElementSize } from '../../hooks/useElementSize'

interface ExpandProps extends StepProps {
    horizontal?: boolean
}

export const Expand: FC<ExpandProps> = props => {
    const direction = props.horizontal ? 'width' : 'height'
    const ref = useRef<HTMLDivElement>(null)

    const { addStep } = useSlides()
    const [addedStep, setAddedStep] = useState(false)
    const size = useElementSize(ref)

    useEffect(() => {
        if (!size || addedStep) return

        setAddedStep(true)

        if (props.in) {
            addStep(
                props.in,
                {
                    targets: ref.current,
                    keyframes: [{ [direction]: size[direction] }, { opacity: 1 }],
                },
                props.options || { title: 'Expand' },
            )
        }

        if (props.out) {
            addStep(props.out, {
                targets: ref.current,
                keyframes: [{ opacity: 0 }, { [direction]: 0 }],
            })
        }
    }, [size, addedStep])

    return (
        <Container
            ref={ref}
            style={{
                opacity: props.in ? 0 : 1,
                [direction]: size && props.in ? 0 : undefined,
            }}
        >
            {props.children}
        </Container>
    )
}

const Container = styled.div`
    overflow: hidden;
`
