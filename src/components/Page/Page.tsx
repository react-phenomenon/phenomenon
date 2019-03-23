import React, { ReactType, memo } from 'react'

export type PageProps = {
    component: ReactType<any>
    name: string
    registerPage: any
}

export const Page = memo((props: PageProps) => {
    const page = props.registerPage(props.name)
    return (
        <div>
            <props.component key={page.name} addStep={page.addStep} end={page.end} />
        </div>
    )
})
