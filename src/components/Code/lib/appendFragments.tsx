import React, { createContext, FC } from 'react'
import { stringReplace } from './stringReplace'
import styled from 'styled-components'

const ID_REGEXP = /\n?\$([A-Z0-9_]*)\n?/g // $SOME

export const FragmentsProvider = createContext<{ [key: string]: any }>({})

export const appendFragments = (code: string, fn: (id: string) => any) => {
    let newCode = stringReplace(code, ID_REGEXP, fn)
    for (const style of styles) {
        newCode = mapCode(newCode, c => highlight(c, style.reg, style.Comp))
    }
    return newCode
    // return mapCode(stringReplace(code, ID_REGEXP, fn), highlightKeywords)
}

const mapCode = (code: any[], fn: (c: string) => any) =>
    code.map(item => (typeof item === 'string' ? fn(item) : item)).flat()

const highlight = (code: string, reg: RegExp, Comp: any) =>
    stringReplace(code, reg, key => (
        <Comp key={code + key} value={key}>
            {key}
        </Comp>
    ))

const Color: FC<{ value: string }> = ({ value }) => (
    <span style={{ color: value }}>{value}</span>
)

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
