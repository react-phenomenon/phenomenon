import React, { useState } from 'react'
import { Page } from '../components/Page'
import { Slides } from '../components/Slides'
import { Test } from './Test'
// import { Examples } from './Examples'
// import { Intro } from './Intro'
// import { TheEnd } from './TheEnd'

export const App = () => {
    const [step, setStep] = useState(0)

    return (
        <Slides>
            <button onClick={() => setStep(step + 1)}>gooo {step}</button>
            <Page name="TestA" component={Test as any} />
            <Page name="TestB" component={Test as any} />
            <Page name="TestC" component={Test as any} />
        </Slides>
    )
}
