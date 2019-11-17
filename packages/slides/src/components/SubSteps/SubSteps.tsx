import React, { FC, createContext, useContext } from 'react'
import { ID } from '../../types/ID'
import { SubStepsProps } from '../../types/SubStepsProps'

export const SubStepsContext = createContext<ID>([])

export const SubSteps: FC<SubStepsProps> = props => {
    const { start = 0, unwrap = false } = props
    const parent = useContext(SubStepsContext)

    if (unwrap) {
        return <>{props.children}</>
    }

    return (
        <SubStepsContext.Provider value={[...parent, start]}>
            {props.children}
        </SubStepsContext.Provider>
    )
}
