import { createGlobalState } from 'react-hooks-global-state'

export interface State {
    pages: string[]
    currentPage: string | null
    currentStep: number
}

const initialState: State = {
    pages: [],
    currentPage: null,
    currentStep: 0,
}

const store = createGlobalState(initialState)

const { GlobalStateProvider, useGlobalState } = store

export { GlobalStateProvider, useGlobalState }
