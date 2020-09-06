import React, { FC } from 'react'
import styled from 'styled-components'
import { SubStepsProps } from '../../types/SubStepsProps'
import { SubSteps } from '../SubSteps'

interface ConsoleProps extends SubStepsProps {
    scale?: number
    width?: number
    height?: number
}

export const Console: FC<ConsoleProps> = ({
    scale = 1,
    width = 600,
    height = 300,
    start,
    unwrap,
    children,
}) => {
    return (
        <SubSteps start={start} unwrap={unwrap}>
            <Wrapper>
                <Container style={{ fontSize: `${scale}em`, width, height }}>
                    <div>{children}</div>
                </Container>
            </Wrapper>
        </SubSteps>
    )
}

const Wrapper = styled.div`
    font-family: 'Source Code Pro', monospace;
    font-size: 16px;
`

const Container = styled.div`
    overflow: hidden;
    position: relative;
    margin: 2em auto;
    padding: 0 0.5em 0.5em 0.5em;
    display: flex;
    align-items: flex-end;
    background-color: #20242b;
    border-radius: 0.5em;
    color: #f0f8ff;
    line-height: 1.6em;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2em;
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
