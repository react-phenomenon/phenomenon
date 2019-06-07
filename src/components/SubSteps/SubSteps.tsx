import React, { FC, createContext, useContext } from 'react'
import { ID } from '../../types/ID'

export const SubStepsContext = createContext<ID>([])

interface SubStepsProps {
    id: ID
}

export const SubSteps: FC<SubStepsProps> = props => {
    const parent = useContext(SubStepsContext)
    return (
        <SubStepsContext.Provider value={[...parent, ...props.id]}>
            {props.children}
        </SubStepsContext.Provider>
    )
}
