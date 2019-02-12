import React, { ReactNode, Children } from 'react'
import { Fragments } from '../../../types/Fragments'
import { stripIndent } from './stripIndent'
import { FragProps } from '../../Frag/Frag'

export const findFragments = (children: ReactNode, slide: number): Fragments => {
    const fragments: Fragments = {}

    Children.forEach(children, (el, index) => {
        const element = el as any
        const Frag = element.type
        const props: FragProps = element.props
        const show = slide >= props.index

        const { code, ...otherProps } = props
        const stripedCode = typeof code === 'string' ? stripIndent(code) : code

        fragments[props.id] = (
            <Frag key={props.id + index + code} {...otherProps} code={stripedCode} show={show} />
        )
    })

    return fragments
}
