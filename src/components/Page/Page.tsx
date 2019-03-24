import React, { ReactType, useCallback, useContext } from 'react'
import { SlidesContext } from '../Slides'

export type PageProps = {
    component: ReactType<any>
    name: string
}

// const initialState = {
//     addStep: (_index: number, _duration = 1000) => {},
// }

// export const PageContext = createContext(initialState)

export const Page = (props: PageProps) => {
    const { addPage, addPageStep } = useContext(SlidesContext)
    console.log(`Page.addPage(${props.name})`)

    addPage(props.name)

    const addStep = useCallback(
        (index: number, duration = 1000) => {
            console.log(`Page.addPageStep(${props.name}, ${index}, ${duration})`)
            addPageStep(props.name, index, duration)
        },
        [props.name],
    )

    return (
        // <PageContext.Provider value={initialState}>
        <props.component key={props.name} addStep={addStep} end={() => 'end'} />
        // </PageContext.Provider>
    )
}
