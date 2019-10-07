import React, { FC } from 'react'
import styled from 'styled-components'
import { CodeProps, Code } from '../Code'
import { getChildrenByType } from '../Code/lib/getChildrenByType'
import { Swap } from '../Swap'

interface CodeWithTextProps extends CodeProps {}

export const CodeWithText: FC<CodeWithTextProps> = props => {
    const infos = getChildrenByType('info', props.children)

    return (
        <Columns>
            <div>
                <Swap start={props.start} unwrap>
                    {infos}
                </Swap>
            </div>
            <div>
                <Code {...props} start={props.start} unwrap />
            </div>
        </Columns>
    )
}

const Columns = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    align-items: center;
    grid-gap: 20px;
`
