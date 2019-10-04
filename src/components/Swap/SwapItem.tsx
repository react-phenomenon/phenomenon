import React, { FC, useRef } from 'react'
import { StepProps } from '../../types/StepProps'
import { useStep } from '../../hooks/useStep'
import { useElementSize } from '../../hooks/useElementSize'
import styled from 'styled-components'

interface SwapItemProps extends StepProps {}

export const SwapItem: FC<SwapItemProps> = props => {
    const ref = useRef(null)
    const size = useElementSize(ref)

    useStep(
        props.in,
        (timeline, { duration, ease }) => {
            timeline.fromTo(
                ref.current!,
                duration.fast,
                { height: 0, opacity: 0 },
                { height: size!.height, opacity: 1, ease },
            )
        },
        { title: '→SwapItem', deps: [size !== null] },
    )

    useStep(
        props.out,
        (timeline, { duration, ease }) => {
            timeline.to(ref.current!, duration.fast, {
                height: 0,
                opacity: 0,
                y: '-100%',
                ease,
            })
        },
        { title: '←SwapItem' },
    )

    return <Container ref={ref}>{props.children}</Container>
}

const Container = styled.div`
    overflow: hidden;
`
