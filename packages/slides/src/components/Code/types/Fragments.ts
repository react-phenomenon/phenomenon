import { ReactNode } from 'react'

export interface Fragments {
    [key: string]: {
        element: ReactNode
        inline: boolean
    }
}
