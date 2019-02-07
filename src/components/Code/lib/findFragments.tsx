import React, { ReactNode, Children } from 'react'
import { Fragments } from '../../../types/Fragments'

export const findFragments = (children: ReactNode, slide: number): Fragments => {
    const fragments: Fragments = {}

    Children.forEach(children, el => {
        const { props, type: Frag } = el as any
        const show = slide >= props.index
        fragments[props.id] = <Frag {...props} show={show} />
    })

    return fragments
}
