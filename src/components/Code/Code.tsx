import React, { ReactNode, useState, useEffect } from 'react'
import { useKeyPress } from '../../hooks/useKeyPress'
import { findFragments } from './lib/findFragments'
import { stringReplace } from './lib/stringReplace'
import { stripIndent } from './lib/stripIndent'

type CodeProps = {
    code: string
    children: ReactNode
}

const reg = /\$([A-Z_]*)/g

export const Code = (props: CodeProps) => {
    const slide = useSlides()

    const fragments = findFragments(props.children, slide)
    const code = stripIndent(props.code)
    const out = stringReplace(code, reg, id => fragments[id])

    return (
        <div>
            <pre>{out}</pre>
            {slide}
        </div>
    )
}

const useSlides = () => {
    const nextPress = useKeyPress(' ', 'ArrowRight', 'd')
    const prevPress = useKeyPress('Backspace', 'ArrowLeft', 'a')
    const [slide, setSlide] = useState(0)

    useEffect(() => {
        if (nextPress) setSlide(slide + 1)
        if (prevPress) setSlide(slide - 1)
    }, [nextPress, prevPress])

    return slide
}
