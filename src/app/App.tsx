import React, { useState } from 'react'
import { Page } from '../components/Page'
import { Slides } from '../components/Slides'
import { Test } from './Test'
// import { Examples } from './Examples'
// import { Intro } from './Intro'
// import { TheEnd } from './TheEnd'

type Step = {
    id: string
    index: number
    duration: number
}

class PageInstance {
    private isRdy = false
    public steps: Step[] = []

    constructor(public name: string, private onEnd: () => void) {
        console.log('new PageInstance', name)
    }

    public addStep = (index: number, duration = 1000) => {
        const id = `[id:${this.name}-${index}]`
        if (this.isRdy) {
            // tslint:disable-next-line: no-console
            console.log('addStep: Already ended adding!', this.name, index)
            return id
        }
        console.log('addStep', this.name, index)

        this.steps.push({ id, index, duration })

        return id
    }

    public end = () => {
        console.log('Already ended', this.name)
        if (this.isRdy) return
        console.log('end', this.name)
        this.isRdy = true
        this.onEnd()
    }
}

const useSlides = () => {
    const [rdyCount, setRdyCount] = useState(0)
    const addRdy = () => setRdyCount(rdyCount + 1)

    const [pages, setPages] = useState<PageInstance[]>([])
    const addPage = (page: PageInstance) => setPages([...pages, page])
    const getPage = (name: string) => pages.find(p => p.name === name)

    const registerPage = (name: string) => {
        console.log('registerPage', name)

        const oldPage = getPage(name)
        if (oldPage) {
            return oldPage
        }
        const page = new PageInstance(name, addRdy)

        addPage(page)

        return page
    }

    return {
        pages,
        registerPage,
    }
}

export const App = () => {
    // const [currentPage] = useGlobalState('currentPage')
    // const [currentStep] = useGlobalState('currentStep')
    const { pages, registerPage } = useSlides()
    const [step, setStep] = useState(0)

    console.log(pages)

    // tslint:disable-next-line:no-console
    // console.log({ currentPage, currentStep })

    return (
        <Slides>
            <button onClick={() => setStep(step + 1)}>gooo</button>
            <Page name="TestA" component={Test as any} registerPage={registerPage} />
            <Page name="TestB" component={Test as any} registerPage={registerPage} />
            <Page name="TestC" component={Test as any} registerPage={registerPage} />
            <div>
                {pages.map(page => (
                    <div key={page.name}>
                        <h5>{page.name}</h5>
                        <h5>
                            {page.steps.map(s => (
                                <div key={s.id}>{s.id}</div>
                            ))}
                        </h5>
                    </div>
                ))}
            </div>
            {/* <Page component={Intro} page={registerPage('Intro')} />
            <Page component={Examples} page={registerPage('Examples')} />
            <Page component={TheEnd} page={registerPage('End')} /> */}
        </Slides>
    )
}
