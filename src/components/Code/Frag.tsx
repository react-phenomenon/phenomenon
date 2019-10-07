import React, { ReactNode, useContext, useRef } from 'react'
import styled from 'styled-components'
import { config } from '../../app/config'
import { useElementSize } from '../../hooks/useElementSize'
import { useStep } from '../../hooks/useStep'
import { StepProps } from '../../types/StepProps'
import { appendFragments, FragmentsProvider } from './lib/appendFragments'
import { Fragments } from './types/Fragments'
import { FragFC } from './types/FragFC'

export interface FragProps extends StepProps {
    id: string
    code: ReactNode
    inline?: boolean
    indent?: number
}

export const Frag: FragFC<FragProps> = props => {
    const ref = useRef<HTMLDivElement>(null)
    const size = useElementSize(ref)
    const fragments = useContext(FragmentsProvider)

    const key = props.inline ? 'width' : 'height'

    const code =
        typeof props.code === 'string'
            ? prepareTextCode(props.code, fragments, props.indent)
            : props.code

    useStep(
        props.in,
        (timeline, { duration, ease }) => {
            timeline
                .fromTo(
                    ref.current!,
                    duration.normal,
                    {
                        [key]: 0,
                        opacity: 0,
                        backgroundColor: backgroundColorIn,
                    },
                    {
                        [key]: size![key],
                        opacity: 1,
                        ease,
                    },
                )
                .set(ref.current!, { [key]: 'auto' })
                .to(ref.current!, duration.fast, {
                    backgroundColor: backgroundColorOut,
                })
        },
        { title: '→Frag', deps: [size !== null] },
    )

    useStep(
        props.out,
        (timeline, { duration, ease }) => {
            timeline.to(ref.current!, duration.normal, {
                [key]: 0,
                opacity: 0,
                ease,
            })
        },
        { title: '←Frag' },
    )

    return (
        <>
            {!size && !props.inline && <div />}
            <Element
                key={props.id}
                inline={props.inline}
                ref={ref}
                style={{ position: size ? 'relative' : 'absolute' }}
            >
                {code}
            </Element>
        </>
    )
}

// TODO this is not the best idea
// This will differentiate this component from the <Frag />
Frag._type = 'frag'

const prepareTextCode = (code: string, fragments: Fragments, indent = 0) => {
    const indentedCode = code
        .split('\n')
        .map(line => config.indent.repeat(indent) + line)
        .join('\n')

    return appendFragments(indentedCode, fragments)
}

const backgroundColorIn = 'rgba(255, 255, 255, 0.4)'
const backgroundColorOut = 'rgba(255, 255, 255, 0.0)'

const Element = styled.code<{ inline?: boolean }>`
    display: ${p => (p.inline ? 'inline-block' : 'block')};
    vertical-align: top;
    overflow: hidden;
    border-radius: 3px;
    box-sizing: border-box;
    white-space: pre;
`
