import React, { FC, useRef, useEffect } from 'react'
import { SubSteps } from '../SubSteps'
import { useSlides } from '../../hooks/useSlides'
import styled from 'styled-components'
import { StepProps } from '../../types/StepProps'
import { Expand } from '../Expand'

interface ConsoleProps extends StepProps {}

export const Console: FC<ConsoleProps> = props => {
    return (
        <Expand in={props.in} out={props.out} options={{ title: 'Console' }}>
            <SubSteps id={[props.in]}>
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
`

const Scroll = styled.div`
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 10px;
`
