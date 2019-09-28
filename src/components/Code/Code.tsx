import React, { Children, FC } from 'react'
import styled from 'styled-components'
import { stripIndent } from '../../helpers/stripIndent'
import { StepProps } from '../../types/StepProps'
import { SubSteps } from '../SubSteps'
import { appendFragments, FragmentsProvider } from './lib/appendFragments'
import { findFragments } from './lib/findFragments'
import { Tab } from './partials/Tab'
import { FragFC } from './types/FragFC'

interface CodeProps {
    code: string
    filename?: string
    start?: number
}

export const Code: FC<CodeProps> = props => {
    const fragments = findFragments(props.children)
    const code = stripIndent(props.code)
    const codeWithFragments = appendFragments(code, fragments)
    const markers = Children.toArray(props.children).filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (node: any) => !(node.type as FragFC<StepProps>)._fragment,
    )

    return (
        <SubSteps id={[props.start || 0]}>
            <FragmentsProvider.Provider value={fragments}>
                <Container>
                    {props.filename && <Tab name={props.filename} />}
                    <Background>
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
`

const Pre = styled.pre`
    position: relative;
`
