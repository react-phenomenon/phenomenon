import React from 'react'
import { FragFC } from '../Code/types/FragFC'
import { SwapItemProps, SwapItem } from '../Swap'

export const CodeInfo: FragFC<SwapItemProps> = props => {
    return <SwapItem {...props}>{props.children}</SwapItem>
}

CodeInfo._type = 'info'
