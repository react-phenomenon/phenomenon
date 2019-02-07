import React, { ReactNode } from 'react'
import styled from 'styled-components'

type CodeProps = {
    id: string
    code: ReactNode
    index?: number
    show?: boolean
}

export const Frag = (props: CodeProps) => (
    <Code key={props.id} show={props.show}>
        {props.code}
    </Code>
)

const Code = styled.code<{ show?: boolean }>`
    transition: all 0.5s ease;
    overflow: hidden;
    display: inline-block;
    vertical-align: top;
    color: #abc123;
    opacity: ${p => (p.show ? 1 : 0)};
    width: ${p => (p.show ? 'auto' : 0)};
    transform: scale(${p => (p.show ? 1 : 0.5)});
`
