import { Children, ReactNode } from 'react'
import { StepProps } from '../../../types/StepProps'
import { FragFC, FragType } from '../types/FragFC'

export const getChildrenByType = (type: FragType, children: ReactNode) =>
    Children.toArray(children).filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (node: any) => (node.type as FragFC<StepProps>)._type === type,
    )
