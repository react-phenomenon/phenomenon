import React, { FC } from 'react'
import styled from 'styled-components'
import { stripIndent } from '../../helpers/stripIndent'
import { SubStepsProps } from '../../types/SubStepsProps'
import { SubSteps } from '../SubSteps'
import { appendFragments, FragmentsProvider } from './lib/appendFragments'
import { findFragments } from './lib/findFragments'
import { Tab } from './partials/Tab'
import { getChildrenByType } from './lib/getChildrenByType'

export interface CodeProps extends SubStepsProps {
    code: string
    filename?: string
    maxHeight?: string | number
}

export const Code: FC<CodeProps> = props => {
    const fragments = findFragments(props.children)
    const code = stripIndent(props.code)
    const codeWithFragments = appendFragments(code, fragments)
    const markers = getChildrenByType('mark', props.children)
    const maxHeight =
        typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight

    return (
        <SubSteps start={props.start} unwrap={props.unwrap}>
            <FragmentsProvider.Provider value={fragments}>
                <Container>
                    {props.filename && <Tab name={props.filename} />}
                    <Background style={{ maxHeight }}>
                        <Pre>
                            {codeWithFragments}
                            {markers}
                        </Pre>
                    </Background>
                </Container>
            </FragmentsProvider.Provider>
        </SubSteps>
    )
}

const Container = styled.div`
    line-height: 1.5em;
    font-size: 16px;
    margin: 2em auto;
    color: #f0f8ff;
    font-family: 'Source Code Pro', monospace;
`

const Background = styled.div`
    padding: 1em 2em;
    background-color: #20242b;
    border-radius: 3px;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    position: relative;
    &::after,
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
    &::before {
        top: auto;
        bottom: 0;
        transform: scaleY(-1);
    }
`

const Pre = styled.pre`
    position: relative;
`
