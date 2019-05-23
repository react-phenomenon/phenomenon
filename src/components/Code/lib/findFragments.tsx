import React, { ReactNode, Children } from 'react'
import { Fragments } from '../../../types/Fragments'
import { stripIndent } from './stripIndent'
import { FragProps } from '../Frag'

export const findFragments = (children: ReactNode): Fragments => {
    const fragments: Fragments = {}

    Children.forEach(children, (el, index) => {
        const element = el as any
        const Frag = element.type
        const props: FragProps = element.props

        const { code, ...otherProps } = props
        const stripedCode = typeof code === 'string' ? stripIndent(code) : code

        fragments[props.id] = (
            <Frag
                key={props.id + index + code}
                {...otherProps}
                code={stripedCode}
                index={props.index}
            />
        )
    })

    return fragments
}
