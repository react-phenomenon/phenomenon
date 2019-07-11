import useComponentSize from '@rehooks/component-size'
import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { config } from '../../app/config'
import { useSlides } from '../../hooks/useSlides'
import { StepProps } from '../../types/StepProps'
import { appendFragments, FragmentsProvider } from './lib/appendFragments'
import { Fragments } from './types/Fragments'

export interface FragProps extends StepProps {
    id: string
    code: ReactNode
    inline?: boolean
    indent?: number
}

const prepareTextCode = (code: string, indent: number = 0, fragments: Fragments) => {
    const indentedCode = code
        .split('\n')
        .map(line => config.indent.repeat(indent) + line)
        .join('\n')

    return appendFragments(indentedCode, fragments)
}

export const Frag = (props: FragProps) => {
    const ref = useRef(null)

    const fragments = useContext(FragmentsProvider)

    const { width, height } = useComponentSize(ref)
    const [size, saveSize] = useState<{ width: number; height: number } | null>(null)
    const [addedStep, setAddedStep] = useState(false)
    const { addStep } = useSlides()

    const key = props.inline ? 'width' : 'height'

    const code =
        typeof props.code === 'string'
            ? prepareTextCode(props.code, props.indent, fragments)
            : props.code

    useEffect(() => {
        if (width && !size) {
            saveSize({ width, height })
        }

        if (!size || addedStep) return

        setAddedStep(true)

        if (props.in) {
            addStep(
                props.in,
                {
                    targets: ref.current,
                    [key]: [0, size[key]],
                    opacity: [0, 1],
                    backgroundColor: [
                        'rgba(255, 255, 255, 0.9)',
                        'rgba(255, 255, 255, 0.0)',
                    ],
                },
                { title: 'Frag' },
            )
        }

        if (props.out) {
            addStep(props.out, {
                targets: ref.current,
                opacity: 0,
                [key]: 0,
            })
        }
    }, [width, size, addedStep])

    return (
        <Element
            key={props.id}
            inline={props.inline}
            ref={ref}
            style={{
                [key]: size ? 0 : undefined,
                // position: size ? 'relative' : 'absolute',
            }}
        >
            {code}
        </Element>
    )
}

const Element = styled.code<{ inline?: boolean }>`
    display: ${p => (p.inline ? 'inline-block' : 'block')};
    vertical-align: top;
    overflow: hidden;
    border-radius: 3px;
    box-sizing: border-box;
`
