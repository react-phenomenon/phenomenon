import { ReactNode, Children, ReactElement } from 'react'
import { PageProps } from '../../Page'

export const findPages = (children: ReactNode): string[] =>
    Children.map<string, ReactElement<PageProps>>(children as any, child => child.props.name)
