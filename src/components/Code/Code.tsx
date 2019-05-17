import React, { ReactNode } from 'react'
import { findFragments } from './lib/findFragments'
import { stringReplace } from './lib/stringReplace'
import { stripIndent } from './lib/stripIndent'

type CodeProps = {
    code: string
    children?: ReactNode
}

const reg = /\$([A-Z0-9_]*)/g

export const Code = (props: CodeProps) => {
    const step = 0

    const fragments = findFragments(props.children, step)
    const code = stripIndent(props.code)
    const out = stringReplace(code, reg, id => fragments[id])

    return (
        <div>
            <pre>{out}</pre>
        </div>
    )
}
