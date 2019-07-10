import styled, { css } from 'styled-components'

const baseTextStyles = css`
    line-height: 1.6;
    font-family: 'Source Code Pro', monospace;
`

export const Title = styled.h1`
    ${baseTextStyles}
    text-align: center;
    color: #69a0d3;
    font-size: 48px;
`

export const SubTitle = styled.h2`
    ${baseTextStyles}
    text-align: center;
    color: #69a0d3;
    font-size: 28px;
`

export const Text = styled.p`
    ${baseTextStyles}
    font-size: 16px;
    color: #f0f8ff;
`
