import React, { FC, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { StepProps } from '../../types/StepProps'
import { useElementSize } from '../../hooks/useElementSize'
import { useStep } from '../../hooks/useStep'

interface ExpandProps extends StepProps {
    horizontal?: boolean
}

export const Expand: FC<ExpandProps> = props => {
    const direction = props.horizontal ? 'width' : 'height'
    const ref = useRef<HTMLDivElement>(null)
    const size = useElementSize(ref)

    useStep(
        props.in,
        (timeline, { duration, ease }) => {
            const el = ref.current!
            timeline
                .to(el, duration.fast, {
                    [direction]: size![direction],
                    ease,
                })
                .to(el, duration.fast, {
                    opacity: 1,
                    ease,
                })
        },
        { title: '→Expand', deps: [size !== null] },
    )

    useStep(
        props.out,
        (timeline, { duration, ease }) => {
            const el = ref.current!
            timeline
                .to(el, duration.fast, {
                    opacity: 0,
                    ease,
                })
                .to(el, duration.fast, {
                    [direction]: 0,
                    ease,
                })
        },
        { title: '←Expand' },
    )

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
