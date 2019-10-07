import React, { Children, ReactNode, ReactElement } from 'react'
import { Fragments } from '../types/Fragments'
import { FragProps } from '../Frag'
import { stripIndent } from '../../../helpers/stripIndent'
import { FragFC } from '../types/FragFC'

export const findFragments = (children: ReactNode): Fragments => {
    const fragments: Fragments = {}

    const fragmentNodes = Children.toArray(children).filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (node: any) => (node.type as FragFC<FragProps>)._type === 'frag',
    )

    fragmentNodes.forEach((el, index) => {
        const element = el as ReactElement<FragProps>
        const Frag = element.type
        const props = element.props

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
