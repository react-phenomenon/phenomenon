import React, { FC, useRef } from 'react'
import styled from 'styled-components'
import { useElementSize } from '../../hooks/useElementSize'
import { useStep } from '../../hooks/useStep'
import { StepProps } from '../../types/StepProps'
import { animate, fromTo, val } from '@phenomenon/lightning'

interface ExpandProps extends StepProps {
    horizontal?: boolean
}

export const Expand: FC<ExpandProps> = props => {
    const direction = props.horizontal ? 'width' : 'height'
    const ref = useRef<HTMLDivElement>(null)
    const size = useElementSize(ref)

    useStep(
        props.in,
        ({ duration }) =>
            animate(ref.current!, [
                fromTo(
                    {
                        opacity: val(0, 1),
                        [direction]: val(0, size![direction], 'px'),
                    },
                    duration.normal,
                ),
            ]),
        { title: '→Expand', deps: [size !== null] },
    )

    useStep(
        props.out,
        ({ duration }) =>
            animate(ref.current!, [
                fromTo(
                    {
                        opacity: val(1, 0),
                        [direction]: val(size![direction], 0, 'px'),
                    },
                    duration.normal,
                ),
            ]),
        { title: '←Expand' },
    )

    return <Container ref={ref}>{props.children}</Container>
}

const Container = styled.div`
    overflow: hidden;
`
