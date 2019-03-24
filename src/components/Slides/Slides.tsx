import React, { createContext, ReactNode, useReducer, useCallback } from 'react'
// import { useGlobalState } from '../../state'
// import { findPages } from './lib/findPages'
// import { useSlides } from '../../hooks/useSlides'

type SlidesProps = {
    children?: ReactNode
}

type Step = {
    id: string
    index: number
    duration: number
}

type Page = {
    name: string
    steps: Step[]
}

type State = {
    pages: Page[]
    stepsIds: string[]
}

const initialState: State = {
    pages: [],
    stepsIds: [],
}

export const SlidesContext = createContext({
    state: initialState,
    addPage: (_name: string) => {},
    addPageStep: (_name: string, _step: number, _duration?: number) => {},
})

function reducer(state: State, action: any): State {
    switch (action.type) {
        case 'ADD_PAGE': {
            const { name } = action.payload
            console.log('ADD_PAGE', name)
            if (state.pages.find(p => p.name === name)) {
                return state
            }

            return {
                ...state,
                pages: [...state.pages, { name, steps: [] }],
            }
        }

        case 'ADD_PAGE_STEP': {
            const { name, index, duration } = action.payload
            console.log('ADD_PAGE_STEP', name, index)
            const id = `[${name}:${index}]`

            if (state.stepsIds.includes(id)) {
                return state
            }

            return {
                ...state,
                stepsIds: [...state.stepsIds, id],
                pages: state.pages.map(page => {
                    if (page.name !== name) {
                        return page
                    }

                    const newStep = {
                        id: `[${name}:${index}]`,
                        index,
                        duration,
                    }

                    return {
                        ...page,
                        steps: [...page.steps, newStep],
                    }
                }),
            }
        }
        default:
            throw new Error()
    }
}

export const Slides = (props: SlidesProps) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    console.log('Slider.render', state)

    const addPage = useCallback((name: string) => {
        console.log('Slides.addPage ', name)
        dispatch({ type: 'ADD_PAGE', payload: { name } })
    }, [])

    const addPageStep = useCallback((name: string, index: number, duration: number = 1000) => {
        console.log('Slides.addPageStep ', name, index)
        dispatch({ type: 'ADD_PAGE_STEP', payload: { name, index, duration } })
    }, [])

    // useSlides()
    // const [allPages, updateAllPages] = useGlobalState('pages')
    // const [currentPage, updateCurrentPage] = useGlobalState('currentPage')

    // if (!allPages.length) {
    //     const pages = findPages(props.children)
    //     if (pages.length < 1) return null

    //     updateCurrentPage(pages[0])
    //     updateAllPages(pages)
    // }

    // if (!allPages && !currentPage) return null

    return (
        <SlidesContext.Provider value={{ state, addPage, addPageStep }}>
            <div>{props.children}</div>
            <div>
                {state.pages.map((page: any) => (
                    <div key={page.name}>
                        <h5>{page.name}</h5>
                        <h5>
                            {page.steps.map((s: any) => (
                                <div key={s.id}>{s.id}</div>
                            ))}
                        </h5>
                    </div>
                ))}
            </div>
        </SlidesContext.Provider>
    )
}
