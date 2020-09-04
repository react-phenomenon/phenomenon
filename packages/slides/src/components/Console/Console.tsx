import React, { FC } from 'react'
import styled from 'styled-components'
import { SubStepsProps } from '../../types/SubStepsProps'
import { SubSteps } from '../SubSteps'

interface ConsoleProps extends SubStepsProps {}

export const Console: FC<ConsoleProps> = props => {
    return (
        <SubSteps start={props.start} unwrap={props.unwrap}>
            <Container>
                <div>{props.children}</div>
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
    margin: 2em auto;
    padding: 0 10px 10px 10px;
    display: flex;
    align-items: flex-end;
    background-color: #20242b;
    border-radius: 0.5em;
    font-family: 'Source Code Pro', monospace;
    font-size: 16px;
    color: #f0f8ff;
    line-height: 1.6;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 30px;
        background-image: linear-gradient(
            to top,
            transparent 0%,
            #20242b 70%,
            #20242b 100%
        );
    }
`

const Scroll = styled.div`
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 10px;
`
