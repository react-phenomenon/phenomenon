import React, { FC } from 'react'
import styled from 'styled-components'
import { stripIndent } from '../../helpers/stripIndent'
import { SubStepsProps } from '../../types/SubStepsProps'
import { SubSteps } from '../SubSteps'
import { appendFragments, FragmentsProvider } from './lib/appendFragments'
import { findFragments } from './lib/findFragments'
import { Tab } from './partials/Tab'

export interface CodeProps extends SubStepsProps {
    code: string
    filename?: string
    maxHeight?: string | number
    minWidth?: string | number
    scale?: number
}

export const Code: FC<CodeProps> = props => {
    const fragments = findFragments(props.children)
    const code = stripIndent(props.code)
    const codeWithFragments = appendFragments(code, fragments)

    const { filename, start, unwrap, scale = 1 } = props

    const maxHeight = props.maxHeight && normalizeSize(props.maxHeight, scale)
    const minWidth = props.minWidth && normalizeSize(props.minWidth, scale)

    return (
        <SubSteps start={start} unwrap={unwrap}>
            <FragmentsProvider.Provider value={fragments}>
                <Wrapper>
                    <Container style={{ fontSize: `${scale}em` }}>
                        {filename && <Tab name={filename} />}
                        <Background style={{ maxHeight, minWidth }}>
                            <Pre>{codeWithFragments}</Pre>
                        </Background>
                    </Container>
                </Wrapper>
            </FragmentsProvider.Provider>
        </SubSteps>
    )
}

const normalizeSize = (size: number | string, scale: number) =>
    typeof size === 'number' ? `${size * scale}px` : size

const Wrapper = styled.div`
    font-family: 'Source Code Pro', monospace;
    font-size: 16px;
`

const Container = styled.div`
    margin: 2em auto;
    line-height: 1.5em;
    color: #f0f8ff;
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
        height: 2em;
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
    font-family: inherit;
    code {
        font-family: inherit;
    }
`
