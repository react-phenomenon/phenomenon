import React, { ReactNode } from 'react'
import styled from 'styled-components'

type CommentProps = {
    children: ReactNode
}

export const Comment = (props: CommentProps) => <Italic>// {props.children}</Italic>

const Italic = styled.span`
    font-style: italic;
    color: #999;
`
