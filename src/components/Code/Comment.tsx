import React, { FC } from 'react'
import styled from 'styled-components'

export const Comment: FC = props => <Italic>// {props.children}</Italic>

const Italic = styled.span`
    font-style: italic;
    color: #999;
`
