import { animate, fromTo, transform, val } from '@phenomenon/lightning'
import React, { FC, useRef } from 'react'
import styled from 'styled-components'
import { useElementSize } from '../../hooks/useElementSize'
import { useStep } from '../../hooks/useStep'
import { StepProps } from '../../types/StepProps'

export interface SwapItemProps extends StepProps {}

export const SwapItem: FC<SwapItemProps> = props => {
    const ref = useRef(null)
    const size = useElementSize(ref)

    useStep(
        props.in,
        ({ duration }) =>
            animate(ref.current!, [
                fromTo(
                    {
                        height: val(0, size!.height, 'px'),
                        opacity: val(0, 1),
                    },
                    duration.normal,
                ),
            ]),
        { title: '→SwapItem', deps: [size !== null] },
    )

    useStep(
        props.out,
        ({ duration }) =>
            animate(ref.current!, [
                fromTo(
                    {
                        height: val(size!.height, 0, 'px'),
                        opacity: val(1, 0),
                        transform: transform({
                            y: val(0, -100, '%'),
                        }),
                    },
                    duration.normal,
                ),
            ]),
        { title: '←SwapItem', deps: [size !== null] },
    )

    return <Container ref={ref}>{props.children}</Container>
}

const Container = styled.div`
    overflow: hidden;
`
