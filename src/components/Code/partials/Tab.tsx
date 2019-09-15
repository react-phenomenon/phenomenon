import React, { FC } from 'react'
import styled from 'styled-components'
import { getExtensionsIcon } from './extensions'

interface TabProps {
    name: string
}

export const Tab: FC<TabProps> = props => {
    const { name } = props
    const icon = getExtensionsIcon(name)
    return (
        <Container>
            {icon && <Icon src={icon} width={16} height={16} alt="" />}
            <Name>{name}</Name>
        </Container>
    )
}

const Icon = styled.img`
    margin-right: 0.3em;
    display: inline-block;
    vertical-align: middle;
`

const Name = styled.span`
    display: inline-block;
    vertical-align: middle;
`

const Container = styled.div`
    display: inline-block;
    padding: 0.5em 1em;
    border-top: 2px solid lightblue;
    background-color: #20242b;
    border-radius: 3px;
    position: relative;
    top: 3px;
`
