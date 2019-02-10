import React from 'react'
import { render } from 'react-dom'
import { App } from './app/App'
import { GlobalStateProvider } from './state'

render(
    <GlobalStateProvider>
        <App />
    </GlobalStateProvider>,
    document.getElementById('app'),
)
