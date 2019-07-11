import React, { FC, useRef, useEffect } from 'react'
import { SubSteps } from '../SubSteps'
import styled from 'styled-components'
import { StepProps } from '../../types/StepProps'
import { Expand } from '../Expand'

interface ConsoleProps extends StepProps {}

export const Console: FC<ConsoleProps> = props => {
    return (
        <Expand in={props.in} out={props.out} options={{ title: 'Console' }}>
            <SubSteps id={[props.in || 0]}>
                <Container>
                    <Scroll>{props.children}</Scroll>
                </Container>
            </SubSteps>
        </Expand>
    )
}

const Container = styled.div`
    overflow: hidden;
    position: relative;
    width: 500px;
    max-width: 100%;
    height: 300px;
    background-color: #20242b;
    padding: 2em;
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
