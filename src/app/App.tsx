import React, { createContext, FC, useContext, useEffect, useState, useRef } from 'react'
import anime, { AnimeTimelineInstance } from 'animejs'
import { debounce, last, first } from 'lodash'

interface Step {
    id: number[]
    register: (tl: any) => void
    options?: any
}

class Timeline {
    public steps: Step[] = []
    public addStep(id: number[], register: (tl: any) => void, options?: any) {
        console.log('addStep', id, options)
        this.steps.push({ id, register, options })
        this.done()
    }

    private onRegisterCB: any
    public onRegister(cb: any) {
        this.onRegisterCB = cb
    }

    private done = debounce(() => {
        console.log('done')
        this.createLine()
        this.onRegisterCB()
    }, 1000)

    public line?: AnimeTimelineInstance

    private createLine() {
        this.line = anime.timeline({
            autoplay: false, // dont work without duration?…
            duration: 1000,
        })
        this.steps.sort((a, b) => {
            const aEnd = last(a.id)!
            const bEnd = last(b.id)!
            const aStart = first(a.id)!
            const bStart = first(b.id)!

            if (aStart !== bStart) {
                return Math.abs(aStart) - Math.abs(bStart)
            }

            if (a.id.length < b.id.length) {
                return aStart > bStart ? 1 : -1
            }

            return aEnd - bEnd
        })
        this.steps.forEach(step => {
            step.register(this.line)
        })
    }
}

const timeline = new Timeline()
export const TimelineContext = createContext(timeline)

////////////////////////////////

const Controller: FC = props => {
    const timeline = useContext(TimelineContext)
    const [rdy, setRdy] = useState(false)

    useEffect(() => {
        timeline.onRegister(() => {
            setRdy(true)
        })
        console.log(timeline)
    }, [])

    return (
        <div>
            <div>{rdy ? 'RDY!' : 'Loading…'}</div>
            <input
                type="range"
                defaultValue="0"
                onChange={e =>
                    timeline.line!.seek(timeline.line!.duration * (+e.target.value / 100))
                }
            />
            <button onClick={() => timeline.line!.play()}>play</button>
            <button onClick={() => timeline.line!.pause()}>pause</button>
            <ol style={{ position: 'absolute', right: 10, top: 10 }}>
                {timeline.steps.map(step => (
                    <li key={step.id.toString()}>{step.id.join('-')}</li>
                ))}
            </ol>
            {props.children}
        </div>
    )
}

////////////////////////////////

const Deck: FC = props => (
    <TimelineContext.Provider value={timeline}>
        <Controller>{props.children}</Controller>
    </TimelineContext.Provider>
)

const Slide: FC<{ i: number }> = props => {
    const timeline = useContext(TimelineContext)
    const ref = useRef(null)

    useEffect(() => {
        timeline.addStep([props.i], (tl: any) => {
            tl.add({
                targets: ref.current,
                easing: 'easeInOutQuad',
                opacity: [0, 1],
            })
        })
        timeline.addStep([-props.i], (tl: any) => {
            tl.add({
                targets: ref.current,
                easing: 'easeInOutQuad',
                opacity: [1, 0],
            })
        })
    }, [])

    return <div ref={ref}>{props.children}</div>
}

const Text: FC<{ p: number; i: number }> = props => {
    const timeline = useContext(TimelineContext)
    const ref = useRef(null)

    useEffect(() => {
        timeline.addStep([props.p, props.i], (tl: any) => {
            tl.add({
                targets: ref.current,
                easing: 'easeInOutQuad',
                opacity: [0, 1],
            })
        })
    }, [])

    return <p ref={ref}>{props.children}</p>
}

export const App = () => {
    return (
        <Deck>
            <Slide i={1}>
                <h1>Slide 1</h1>
                <Text p={1} i={1}>
                    Hello 1
                </Text>
                <Text p={1} i={2}>
                    Hello 2
                </Text>
                <Text p={1} i={3}>
                    Hello 3
                </Text>
            </Slide>
            <Slide i={2}>
                <h1>Slide 2</h1>
                <Text p={2} i={1}>
                    Hello 1
                </Text>
                <Text p={2} i={2}>
                    Hello 2
                </Text>
                <Text p={2} i={3}>
                    Hello 3
                </Text>
            </Slide>
            <Slide i={3}>
                <h1>Slide 3</h1>
            </Slide>
        </Deck>
    )
}
