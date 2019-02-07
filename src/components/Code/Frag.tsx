import React, { ReactNode, useRef } from 'react'
import styled from 'styled-components'
import useComponentSize from '@rehooks/component-size'

type CodeProps = {
    id: string
    code: ReactNode
    index?: number
    show?: boolean
}

export const Frag = (props: CodeProps) => {
    const ref = useRef(null)
    const { width } = useComponentSize(ref)

    return (
        <Code
            key={props.id}
            show={props.show}
            ref={width ? null : ref}
            style={{ width: width ? (props.show ? width : 0) : undefined }}
        >
            {props.code}
        </Code>
    )
}

const Code = styled.code<{ show?: boolean }>`
    transition: all 0.5s ease;
    display: inline-block;
    vertical-align: top;
    color: #abc123;
    opacity: ${p => (p.show ? 1 : 0)};
    position: ${p => (p.show ? 'relative' : 'absolute')};
    transform: scale(${p => (p.show ? 1 : 0.5)});
`
