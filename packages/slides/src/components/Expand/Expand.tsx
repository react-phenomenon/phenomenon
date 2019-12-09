import React, { FC, useRef } from 'react'
import styled from 'styled-components'
import { useElementSize } from '../../hooks/useElementSize'
import { useStep } from '../../hooks/useStep'
import { StepProps } from '../../types/StepProps'

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
                .fromTo(
                    el,
                    duration.fast,
                    { [direction]: 0, opacity: 0, ease },
                    { [direction]: size![direction], ease },
                )
                .to(el, duration.fast, {
                    opacity: 1,
                    ease,
                })
                .set(el, { height: 'auto' })
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

    return <Container ref={ref}>{props.children}</Container>
}

const Container = styled.div`
    overflow: hidden;
`
