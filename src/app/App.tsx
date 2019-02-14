import React from 'react'
import { Page } from '../components/Page'
import { Slides } from '../components/Slides'
import { useGlobalState } from '../state'
import { Examples } from './Examples'
import { Intro } from './Intro'
import { TheEnd } from './TheEnd'

export const App = () => {
    const [currentPage] = useGlobalState('currentPage')
    const [currentStep] = useGlobalState('currentStep')

    // tslint:disable-next-line:no-console
    console.log({ currentPage, currentStep })

    return (
        <Slides>
            <Page name="intro" component={Intro} />
            <Page name="examples" component={Examples} />
            <Page name="end" component={TheEnd} />
        </Slides>
    )
}
