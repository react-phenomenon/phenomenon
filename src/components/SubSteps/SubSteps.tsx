import React, { FC, createContext, useContext } from 'react'

export const SubStepsContext = createContext<number[]>([])

export const SubSteps: FC<{ id: number[] }> = props => {
    const parent = useContext(SubStepsContext)
    return (
        <SubStepsContext.Provider value={[...parent, ...props.id]}>
            {props.children}
        </SubStepsContext.Provider>
    )
}
