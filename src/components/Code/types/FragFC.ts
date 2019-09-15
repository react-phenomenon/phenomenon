import { FC } from 'react'

export interface FragFC<P> extends FC<P> {
    _fragment: boolean
}
