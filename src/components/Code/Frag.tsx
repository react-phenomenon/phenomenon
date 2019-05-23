import useComponentSize from '@rehooks/component-size'
import React, { useContext, useEffect, useRef, useState, ReactNode } from 'react'
import styled from 'styled-components'
import { TimelineContext } from '../../lib/Timeline'
import { SubStepsContext } from '../SubSteps'

export type FragProps = {
    id: string
    code: ReactNode
    in: number
    out?: number
    show?: boolean
    inline?: boolean
    indent?: number
}

const indent = '    '

export const Frag = (props: FragProps) => {
    const ref = useRef(null)

    const { width, height } = useComponentSize(ref)
    const [size, saveSize] = useState<{ width: number; height: number } | null>(null)
    const [addedStep, setAddedStep] = useState(false)

    const subId = useContext(SubStepsContext)
    const timeline = useContext(TimelineContext)
    const key = props.inline ? 'width' : 'height'

    const code =
        typeof props.code === 'string'
            ? props.code
                  .split('\n')
                  .map(line => indent.repeat(props.indent || 0) + line)
                  .join('\n')
            : props.code

    useEffect(() => {
        if (width && !size) {
            saveSize({ width, height })
        }
        if (size && !addedStep) {
            setAddedStep(true)
            timeline.addStep({
                id: [...subId, props.in],
                params: () => ({
                    targets: ref.current,
                    [key]: [0, size[key]],
                    opacity: [0, 1],
                    backgroundColor: ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.0)'],
                }),
            })

            if (props.out) {
                timeline.addStep({
                    id: [...subId, -props.out],
                    params: () => {
                        return {
                            targets: ref.current,
                            [key]: [size[key], 0],
                        }
                    },
                })
            }
        }
    }, [width, size, addedStep])

    return (
        <Element
            key={props.id}
            show={props.show}
            inline={props.inline}
            ref={ref}
            style={{ [key]: size ? 0 : undefined }}
        >
            {code}
        </Element>
    )
}

const Element = styled.code<{ show?: boolean; inline?: boolean }>`
    /* transition: all 1s ease; */
    display: ${p => (p.inline ? 'inline-block' : 'block')};
    vertical-align: top;
    color: #abc123;
    overflow: hidden;
    border-radius: 3px;
    box-sizing: border-box;
    /* opacity: ${p => (p.show ? 1 : 0)};
    position: ${p => (p.show ? 'relative' : 'absolute')}; */
`
