import React, { ReactNode } from 'react'
import { useGlobalState } from '../../state'

export type PageProps = {
    name: string
    children?: ReactNode
}

export const Page = (props: PageProps) => {
    const [currentPage] = useGlobalState('currentPage')

    if (props.name !== currentPage) return null

    return <div>{props.children}</div>
}
