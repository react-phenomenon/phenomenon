import React, { FC, useEffect, useRef } from 'react'
import { useSlides } from '../../hooks/useSlides'
import { StepProps } from '../../types/StepProps'

interface TextProps extends StepProps {}

export const Fade: FC<TextProps> = props => {
    const ref = useRef(null)
    const { addStep } = useSlides()

    useEffect(() => {
        if (props.in) {
            addStep(
                props.in,
                {
                    targets: ref.current,
                    opacity: 1,
                },
                props.options || { title: 'Fade' },
            )
        }

        if (props.out) {
            addStep(props.out, {
                targets: ref.current,
                opacity: 0,
            })
        }
    }, [])

    return (
        <div ref={ref} style={{ opacity: 0 }}>
            {props.children}
        </div>
    )
}
