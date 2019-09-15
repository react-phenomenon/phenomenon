/* eslint-disable @typescript-eslint/no-explicit-any */ // TODO
import React, { FC } from 'react'
import { stringReplace } from './stringReplace'
import styled from 'styled-components'
import { uniqueId } from 'lodash'

export const highlightCode = (code: string | any[]) => {
    let newCode = typeof code === 'string' ? [code] : code
    for (const style of styles) {
        newCode = mapCode(newCode, c => highlight(c, style.reg, style.Comp))
    }
    return newCode
}

const mapCode = (code: any[], fn: (c: string) => any) =>
    code.map(item => (typeof item === 'string' ? fn(item) : item)).flat()

const highlight = (code: string, reg: RegExp, Comp: any) =>
    stringReplace(code, reg, key => (
        <Comp key={uniqueId('highlight-')} value={key}>
            {key}
        </Comp>
    ))

interface ColorProps {
    value: string
}

const Color: FC<ColorProps> = ({ value }) => <span style={{ color: value }}>{value}</span>

const styles: { reg: RegExp; Comp: any }[] = [
    {
        reg: /(if|else|return|for|while|of|=>)/g,
        Comp: styled.span`
            color: #c678dd;
        `,
    },
    {
        reg: /(#[0-9a-fA-F]{3,6})/g,
        Comp: Color,
    },
    {
        reg: /(true|false|undefined|null)/g,
        Comp: styled.span`
            color: #d19a66;
        `,
    },
    {
        reg: /(["'`].+["'`])/g,
        Comp: styled.span`
            color: #98c379;
        `,
    },
    {
        reg: /(\d+(%|px|\.)*)/g,
        Comp: styled.span`
            color: #d19a66;
        `,
    },
    {
        reg: /([=!@$%^&*<>|]+)/g,
        Comp: styled.span`
            color: #56b6c2;
        `,
    },
]
