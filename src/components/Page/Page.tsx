import React, { ReactType } from 'react'
import { useGlobalState } from '../../state'

export type PageProps = {
    name: string
    component: ReactType<{}>
    page: any
}

export const Page = (props: PageProps) => {
    const [currentPage] = useGlobalState('currentPage')

    if (props.name !== currentPage) return null

    return (
        <div>
            <props.component register={props.page.addStep} />
        </div>
    )
}
