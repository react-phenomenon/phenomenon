import React from 'react'
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { Intro } from './screens/Intro'

export const App = () => (
    <BrowserRouter>
        <>
            <Route path="/" exact component={Intro} />
        </>
    </BrowserRouter>
)
