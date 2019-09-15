import React, { Children, FC } from 'react'
import styled from 'styled-components'
import { stripIndent } from '../../helpers/stripIndent'
import { StepProps } from '../../types/StepProps'
import { Fade } from '../Fade'
import { SubSteps } from '../SubSteps'
import { appendFragments, FragmentsProvider } from './lib/appendFragments'
import { findFragments } from './lib/findFragments'
import { FragFC } from './types/FragFC'

interface CodeProps extends StepProps {
    code: string
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
        <Fade in={props.in} out={props.out} options={{ title: 'Code' }}>
            <SubSteps id={[props.in || 0]}>
                <FragmentsProvider.Provider value={fragments}>
                    <Wrapper>
                        <Pre>
                            {codeWithFragments}
                            {markers}
                        </Pre>
                    </Wrapper>
                </FragmentsProvider.Provider>
            </SubSteps>
        </Fade>
    )
}

const Wrapper = styled.div`
    margin: 2em auto;
    padding: 2em;
    background-color: #20242b;
    border-radius: 0.5em;
    color: #f0f8ff;
    line-height: 1.5em;
    font-size: 16px;
`

const Pre = styled.pre`
    position: relative;
`
