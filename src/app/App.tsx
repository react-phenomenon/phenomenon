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
    const { registerPage } = useSlides()

    // tslint:disable-next-line:no-console
    console.log({ currentPage, currentStep })

    return (
        <Slides>
            <Page name="intro" component={Intro} page={registerPage()} />
            <Page name="examples" component={Examples} page={registerPage()} />
            <Page name="end" component={TheEnd} page={registerPage()} />
        </Slides>
    )
}
