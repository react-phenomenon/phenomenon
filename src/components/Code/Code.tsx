import React, { ReactNode, useContext, useRef, useEffect } from 'react'
import { findFragments } from './lib/findFragments'
import { stringReplace } from './lib/stringReplace'
import { stripIndent } from './lib/stripIndent'
import { SubSteps, SubStepsContext } from '../SubSteps'
import { TimelineContext } from '../../lib/Timeline'
import styled from 'styled-components'

type CodeProps = {
    code: string
    in: number
    out?: number
    children?: ReactNode
}

const ID_REGEXP = /\n?\$([A-Z0-9_]*)\n?/g // $SOME

export const Code = (props: CodeProps) => {
    const fragments = findFragments(props.children)
    const code = stripIndent(props.code)
    const out = stringReplace(code, ID_REGEXP, id => fragments[id])

    const timeline = useContext(TimelineContext)
    const subId = useContext(SubStepsContext)
    const ref = useRef(null)

    useEffect(() => {
        timeline.addStep([...subId, props.in], () => {
            return {
                targets: ref.current,
                easing: 'easeInOutQuad',
                opacity: [0, 1],
                translateX: [250, 0],
            }
        })
        if (props.out) {
            timeline.addStep([...subId, -props.out], () => {
                return {
                    targets: ref.current,
                    easing: 'easeInOutQuad',
                    keyframes: [
                        { opacity: 0 },
                        {
                            height: 0,
                            margin: 0,
                            padding: 0
                        }
                    ],
                }
            })
        }
    }, [])

    const outTrimmed = out.map(item => typeof item === 'string' ? item.trim() : item);

    return (
        <SubSteps id={[props.in]}>
            <Pre ref={ref}>{outTrimmed}</Pre>
        </SubSteps>
    )
}

const Pre = styled.pre`
    overflow: hidden;
    background-color: #20242b;
    padding: 2em;
    margin: 2em auto;
    border-radius: 0.5em;
`
