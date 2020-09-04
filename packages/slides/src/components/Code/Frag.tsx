import React, { ReactNode, useContext, useRef } from 'react'
import styled from 'styled-components'
import { config } from '../../config'
import { useElementSize } from '../../hooks/useElementSize'
import { useStep } from '../../hooks/useStep'
import { StepProps } from '../../types/StepProps'
import { appendFragments, FragmentsProvider } from './lib/appendFragments'
import { FragFC } from './types/FragFC'
import { Fragments } from './types/Fragments'
import { trail, fromTo, val, set, color } from 'light-trails'

export interface FragProps extends StepProps {
    id: string
    code: ReactNode
    inline?: boolean
    indent?: number
    hlIn?: number
    hlOut?: number
}

export const Frag: FragFC<FragProps> = props => {
    const ref = useRef<HTMLDivElement>(null)
    const size = useElementSize(ref)
    const fragments = useContext(FragmentsProvider)

    const direction = props.inline ? 'width' : 'height'
    const hlScale = props.inline ? 1.3 : 1.1

    const code =
        typeof props.code === 'string'
            ? prepareTextCode(props.code, fragments, props.indent)
            : props.code

    useStep(
        props.in,
        ({ duration }) =>
            trail(ref.current!, [
                fromTo(
                    {
                        backgroundColor: color(bgColorOut, bgColorIn),
                        opacity: val(0, 1),
                        [direction]: val(0, size![direction], 'px'),
                    },
                    duration.normal,
                ),
                fromTo({ backgroundColor: color(bgColorIn, bgColorOut) }, duration.fast),
                set({
                    [direction]: [size![direction], 'auto'],
                    overflow: ['hidden', 'visible'],
                }),
            ]),
        { title: '→Frag', deps: [size !== null] },
    )

    useStep(
        props.out,
        ({ duration }) =>
            trail(ref.current!, [
                set({ overflow: ['visible', 'hidden'] }),
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

    useStep(
        props.hlIn,
        ({ duration }) =>
            trail(ref.current!, [
                fromTo(
                    {
                        scale: val(1, hlScale),
                        backgroundColor: color(bgHlColorOut, bgHlColorIn),
                    },
                    duration.normal,
                ),
                fromTo({ scale: val(hlScale, 1) }, duration.normal),
            ]),
        { title: '→Frag hl' },
    )

    useStep(
        props.hlOut,
        ({ duration }) =>
            trail(ref.current!, [
                fromTo(
                    { backgroundColor: color(bgHlColorIn, bgHlColorOut) },
                    duration.normal,
                ),
            ]),
        { title: '←Frag hl' },
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

Frag._type = 'frag'

const prepareTextCode = (code: string, fragments: Fragments, indent = 0) => {
    const indentedCode = code
        .split('\n')
        .map(line => config.indent.repeat(indent) + line)
        .join('\n')

    return appendFragments(indentedCode, fragments)
}

const bgColorIn = 'rgba(255, 255, 255, 0.3)'
const bgColorOut = 'rgba(255, 255, 255, 0.0)'

const bgHlColorIn = 'rgba(255, 180, 0, 0.3)'
const bgHlColorOut = 'rgba(255, 180, 0, 0.0)'

const Element = styled.code<{ inline?: boolean }>`
    display: ${p => (p.inline ? 'inline-block' : 'block')};
    vertical-align: top;
    overflow: hidden;
    border-radius: 3px;
    box-sizing: border-box;
    white-space: pre;
`
