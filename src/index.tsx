import React from 'react'
import { render } from 'react-dom'
import { App } from './app/App'
import { GlobalStateProvider } from './state'
import * as serviceWorker from './serviceWorker'

render(
    <GlobalStateProvider>
        <App />
    </GlobalStateProvider>,
    document.getElementById('app'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
