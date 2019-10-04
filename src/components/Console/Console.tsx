import React, { FC } from 'react'
import styled from 'styled-components'
import { SubStepsProps } from '../../types/SubStepsProps'
import { SubSteps } from '../SubSteps'

interface ConsoleProps extends SubStepsProps {}

export const Console: FC<ConsoleProps> = props => {
    return (
        <SubSteps start={props.start} unwrap={props.unwrap}>
            <Container>
                <Scroll>{props.children}</Scroll>
            </Container>
        </SubSteps>
    )
}

const Container = styled.div`
    overflow: hidden;
    position: relative;
    width: 500px;
    max-width: 100%;
    height: 300px;
    background-color: #20242b;
    margin: 2em auto;
    border-radius: 0.5em;
    font-family: 'Source Code Pro', monospace;
    font-size: 16px;
    color: #f0f8ff;
    line-height: 1.6;
`

const Scroll = styled.div`
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 10px;
`
