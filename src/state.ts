import { createStore } from 'react-hooks-global-state'

interface Page {
    title?: string
    totalTime: number
}

export interface State {
    pages: Page[]
    currentPage: string | null
    currentStep: number
}

const initialState: State = {
    pages: [],
    currentPage: null,
    currentStep: 0,
}

type Action = { type: 'increment' } | { type: 'decrement' }

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'increment':
            return { ...state, currentStep: state.currentStep + 1 }
        case 'decrement':
            return { ...state, currentStep: state.currentStep - 1 }
        default:
            return state
    }
}

const store = createStore(reducer, initialState)

const { GlobalStateProvider, useGlobalState, dispatch } = store

export { GlobalStateProvider, useGlobalState, dispatch }
