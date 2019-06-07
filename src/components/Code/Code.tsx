import React, { ReactNode, useEffect, useRef, FC } from 'react'
import styled from 'styled-components'
import { useSlides } from '../../hooks/useSlides'
import { SubSteps } from '../SubSteps'
import { findFragments } from './lib/findFragments'
import { stripIndent } from '../../helpers/stripIndent'
import { appendFragments, FragmentsProvider } from './lib/appendFragments'
import { StepProps } from '../../types/StepProps'
import { Expand } from '../Expand'

interface CodeProps extends Partial<StepProps> {
    code: string
}

export const Code: FC<CodeProps> = props => {
    const fragments = findFragments(props.children)
    const code = stripIndent(props.code)
    const out = appendFragments(code, fragments)

    // const ref = useRef(null)
    // const { addStep } = useSlides()

    // useEffect(() => {
    //     if (props.in) {
    //         addStep(
    //             props.in,
    //             {
    //                 targets: ref.current,
    //                 opacity: [0, 1],
    //                 translateX: [250, 0],
    //             },
    //             { title: 'Code' },
    //         )
    //     }

    //     if (props.out) {
    //         addStep(-props.out, {
    //             targets: ref.current,
    //             keyframes: [
    //                 { opacity: 0 },
    //                 {
    //                     height: 0,
    //                     margin: 0,
    //                     padding: 0,
    //                 },
    //             ],
    //         })
    //     }
    // }, [])

    return (
        <Expand in={props.in} out={props.out} options={{ title: 'Code' }}>
            <SubSteps id={[props.in || 0]}>
                <FragmentsProvider.Provider value={fragments}>
                    <Pre>{out}</Pre>
                </FragmentsProvider.Provider>
            </SubSteps>
        </Expand>
    )
}

const Pre = styled.pre`
    overflow: hidden;
    background-color: #20242b;
    padding: 2em;
    margin: 2em auto;
    border-radius: 0.5em;
`
