import React, { ReactNode, useContext, useRef } from 'react'
import styled from 'styled-components'
import { config } from '../../config'
import { useElementSize } from '../../hooks/useElementSize'
import { useStep } from '../../hooks/useStep'
import { StepProps } from '../../types/StepProps'
import { appendFragments, FragmentsProvider } from './lib/appendFragments'
import { FragFC } from './types/FragFC'
import { Fragments } from './types/Fragments'
import { animate, fromTo, val, set } from '@phenomenon/lightning'

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

    const direction = props.inline ? 'width' : 'height'

    const code =
        typeof props.code === 'string'
            ? prepareTextCode(props.code, fragments, props.indent)
            : props.code

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
                set({ [direction]: [size![direction], 'auto'] }),
            ]),
        { title: '→Frag', deps: [size !== null] },
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
        { title: '←Frag', deps: [size !== null] },
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

// @TODO
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
