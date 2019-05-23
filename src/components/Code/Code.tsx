import React, { ReactNode, useContext, useRef, useEffect } from 'react'
import { findFragments } from './lib/findFragments'
import { stringReplace } from './lib/stringReplace'
import { stripIndent } from './lib/stripIndent'
import { SubSteps, SubStepsContext } from '../SubSteps'
import { TimelineContext } from '../../lib/Timeline'

type CodeProps = {
    code: string
    index: number
    children?: ReactNode
}

const reg = /\n?\$([A-Z0-9_]*)\n?/g

export const Code = (props: CodeProps) => {
    const fragments = findFragments(props.children)
    const code = stripIndent(props.code)
    const out = stringReplace(code, reg, id => fragments[id])

    const timeline = useContext(TimelineContext)
    const subId = useContext(SubStepsContext)
    const ref = useRef(null)

    useEffect(() => {
        timeline.addStep([...subId, props.index], () => {
            return {
                targets: ref.current,
                easing: 'easeInOutQuad',
                opacity: [0, 1],
                translateX: [250, 0],
            }
        })
    }, [])

    return (
        <SubSteps id={[props.index]}>
            <pre ref={ref}>{out}</pre>
        </SubSteps>
    )
}
