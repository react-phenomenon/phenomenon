import { FC } from 'react'

export type FragType = 'frag' | 'mark' | 'info'

export interface FragFC<P = {}> extends FC<P> {
    _type: FragType
}
