import React from 'react'
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { Intro } from './screens/Intro'
import { Slides } from './screens/Slides'

const base = process.env.NODE_ENV === 'production' ? 'oak' : '/'

export const App = () => (
    <BrowserRouter basename={base}>
        <>
            <Route path="/" exact component={Intro} />
            <Route path="/slides" exact component={Slides} />
        </>
    </BrowserRouter>
)
