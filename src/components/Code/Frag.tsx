import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { config } from '../../app/config'
import { useSlides } from '../../hooks/useSlides'
import { StepProps } from '../../types/StepProps'
import { appendFragments, FragmentsProvider } from './lib/appendFragments'
import { Fragments } from './types/Fragments'
import { useElementSize } from '../../hooks/useElementSize'

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
    const ref = useRef<HTMLDivElement>(null)
    const size = useElementSize(ref)
    const [addedStep, setAddedStep] = useState(false)
    const { addStep } = useSlides()
    const fragments = useContext(FragmentsProvider)

    const key = props.inline ? 'width' : 'height'

    const code =
        typeof props.code === 'string'
            ? prepareTextCode(props.code, props.indent, fragments)
            : props.code

    useEffect(() => {
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
                    update() {
                        const px = ref.current!.style[key] as string
                        const currentSize = Math.round(parseFloat(px))
                        const maxSize = Math.round(size[key])
                        if (currentSize === maxSize) {
                            ref.current!.style[key] = 'auto'
                        }
                    },
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
    }, [size, addedStep, ref.current])

    return (
        <>
            {!size && !props.inline && <div />}
            <Element
                key={props.id}
                inline={props.inline}
                ref={ref}
                style={{
                    [key]: size ? 0 : undefined,
                    position: size ? 'relative' : 'absolute',
                }}
            >
                {code}
            </Element>
        </>
    )
}

const Element = styled.code<{ inline?: boolean }>`
    display: ${p => (p.inline ? 'inline-block' : 'block')};
    vertical-align: top;
    overflow: hidden;
    border-radius: 3px;
    box-sizing: border-box;
    white-space: pre;
`
