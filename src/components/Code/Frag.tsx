import useComponentSize from '@rehooks/component-size'
import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useSlides } from '../../hooks/useSlides'
import { FragmentsProvider, appendFragments } from './lib/appendFragments'
import { StepProps } from '../../types/StepProps'

export interface FragProps extends StepProps {
    id: string
    code: ReactNode
    show?: boolean
    inline?: boolean
    indent?: number
}

const indent = '    '

export const Frag = (props: FragProps) => {
    const ref = useRef(null)

    const fragments = useContext(FragmentsProvider)

    const { width, height } = useComponentSize(ref)
    const [size, saveSize] = useState<{ width: number; height: number } | null>(null)
    const [addedStep, setAddedStep] = useState(false)
    const { addStep } = useSlides()

    const prepareTextCode = (code: string) => {
        const indentedCode = code
            .split('\n')
            .map(line => indent.repeat(props.indent || 0) + line)
            .join('\n')

        return appendFragments(indentedCode, fragments)
    }

    const key = props.inline ? 'width' : 'height'

    const code = typeof props.code === 'string' ? prepareTextCode(props.code) : props.code

    useEffect(() => {
        if (width && !size) {
            saveSize({ width, height })
        }

        if (!size || addedStep) return

        setAddedStep(true)

        addStep(
            props.in,
            {
                targets: ref.current,
                [key]: [0, size[key]],
                opacity: [0, 1],
                backgroundColor: ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.0)'],
            },
            { title: 'Frag' },
        )

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
            show={props.show}
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

const Element = styled.code<{ show?: boolean; inline?: boolean }>`
    display: ${p => (p.inline ? 'inline-block' : 'block')};
    vertical-align: top;
    overflow: hidden;
    border-radius: 3px;
    box-sizing: border-box;
`
