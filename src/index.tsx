import React, { useEffect, useState, createContext, useContext } from 'react'
import { render } from 'react-dom'
import * as serviceWorker from './serviceWorker'
// import { App } from './app/App'
import { GlobalStateProvider } from './state'

interface PageState {
    timeStamp: number // Current position
    step: number // One click timeStamp += step
    isAutoPlay: boolean // Components should play entire animation when timeStamp >= start, because one click will change timeStamp by entire step this will be false when seeking or rendering frame by frame
    isPreFlight: boolean // When doing pre-render of entire presentation and finding end
}

const STEP = 500

const PageContext = createContext<PageState>({
    timeStamp: 0,
    isAutoPlay: true,
    step: STEP,
    isPreFlight: false,
})

const Log = (props: any) => {
    const page = useContext(PageContext)
    const [id, setID] = useState(null)
    useEffect(() => {
        setID(props.log())
    }, [])

    return (
        <span>
            {id}: {page.timeStamp}
        </span>
    )
}

const MultiLog = (props: any) => (
    <div>
        <p>
            [ml1] <Log log={props.log} />
        </p>
        <p>
            [ml2] <Log log={props.log} />
        </p>
    </div>
)

let id = 0

const Main = (_props: any) => {
    const log = () => {
        console.log('log', id++)
        return id
    }
    const [inc, setInc] = useState(0)

    return (
        <PageContext.Provider
            value={{
                timeStamp: inc * STEP,
                isAutoPlay: true,
                step: STEP,
                isPreFlight: false,
            }}
        >
            <div>
                <button onClick={() => setInc(inc + 1)}>setInc {inc}</button>
                <p>
                    [1] <Log log={log} />
                </p>
                <p>
                    [2] <Log log={log} />
                </p>
                <MultiLog log={log} />
                <p>
                    [3] <Log log={log} />
                </p>
                <p>
                    [4] <Log log={log} />
                </p>
            </div>
        </PageContext.Provider>
    )
}

render(
    <GlobalStateProvider>
        {/* <App /> */}
        <Main />
    </GlobalStateProvider>,
    document.getElementById('app'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
