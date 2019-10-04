import React, { FC } from 'react'
import { SubStepsProps } from '../../types/SubStepsProps'
import { SubSteps } from '../SubSteps'

interface SwapProps extends SubStepsProps {}

export const Swap: FC<SwapProps> = props => {
    return (
        <SubSteps start={props.start} unwrap={props.unwrap}>
            {props.children}
        </SubSteps>
    )
}
