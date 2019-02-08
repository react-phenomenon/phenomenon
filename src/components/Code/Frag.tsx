import React, { ReactNode, useRef } from 'react'
import styled from 'styled-components'
import useComponentSize from '@rehooks/component-size'

export type FragProps = {
    id: string
    code: ReactNode
    index: number
    show?: boolean
    block?: boolean
    indent?: number
}

const indent = '    '

export const Frag = (props: FragProps) => {
    const ref = useRef(null)
    const { width, height } = useComponentSize(ref)

    return (
        <Element
            key={props.id}
            show={props.show}
            block={props.block}
            ref={width ? null : ref}
            style={{
                width: width ? (props.show ? width : 0) : undefined,
                height: height ? (props.show ? height : 0) : undefined,
                position: height ? 'relative' : undefined,
            }}
        >
            {typeof props.code === 'string'
                ? props.code
                      .split('\n')
                      .map(line => indent.repeat(props.indent || 0) + line)
                      .join('\n')
                : props.code}
        </Element>
    )
}

const Element = styled.code<{ show?: boolean; block?: boolean }>`
    transition: all 1s ease;
    display: ${p => (p.block ? 'block' : 'inline-block')};
    vertical-align: top;
    color: #abc123;
    opacity: ${p => (p.show ? 1 : 0)};
    position: ${p => (p.show ? 'relative' : 'absolute')};
    transform: scale(${p => (p.show ? 1 : 0.5)});
`
