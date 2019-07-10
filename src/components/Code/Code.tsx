import React, { FC } from 'react'
import styled from 'styled-components'
import { stripIndent } from '../../helpers/stripIndent'
import { StepProps } from '../../types/StepProps'
import { Expand } from '../Expand'
import { SubSteps } from '../SubSteps'
import { appendFragments, FragmentsProvider } from './lib/appendFragments'
import { findFragments } from './lib/findFragments'

interface CodeProps extends Partial<StepProps> {
    code: string
}

export const Code: FC<CodeProps> = props => {
    const fragments = findFragments(props.children)
    const code = stripIndent(props.code)
    const codeWithFragments = appendFragments(code, fragments)

    return (
        <Expand in={props.in} out={props.out} options={{ title: 'Code' }}>
            <SubSteps id={[props.in || 0]}>
                <FragmentsProvider.Provider value={fragments}>
                    <Pre>{codeWithFragments}</Pre>
                </FragmentsProvider.Provider>
            </SubSteps>
        </Expand>
    )
}

const Pre = styled.pre`
    overflow: hidden;
    padding: 2em;
    margin: 2em auto;
    background-color: #20242b;
    border-radius: 0.5em;
    color: #f0f8ff;
    line-height: 1.6;
    font-size: 16px;
`
