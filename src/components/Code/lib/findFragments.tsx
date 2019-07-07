import React, { Children, ReactNode } from 'react'
import { Fragments } from '../types/Fragments'
import { FragProps } from '../Frag'
import { stripIndent } from '../../../helpers/stripIndent'

export const findFragments = (children: ReactNode): Fragments => {
    const fragments: Fragments = {}

    Children.forEach(children, (el, index) => {
        const element = el as any
        const Frag = element.type
        const props: FragProps = element.props

        const { code, inline, ...otherProps } = props
        const stripedCode = typeof code === 'string' && !inline ? stripIndent(code) : code

        fragments[props.id] = {
            element: (
                <Frag
                    key={props.id + index}
                    {...otherProps}
                    code={stripedCode}
                    inline={inline}
                    index={props.in}
                />
            ),
            inline: !!props.inline,
        }
    })

    return fragments
}
