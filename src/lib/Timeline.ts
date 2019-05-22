import { debounce, last, first, isEqual } from 'lodash'
import animejs, { AnimeTimelineInstance, AnimeAnimParams, AnimeInstance } from 'animejs'
import { createContext } from 'react'

type ID = number[]

interface Step {
    id: ID
    register: () => AnimeAnimParams
    options?: any
}

const STEP_DURATION = 500
const STEP_ADD_DEBOUNCE = 100

export class Timeline {
    public steps: Step[] = []
    public line?: AnimeTimelineInstance
    private lastStepPosition = 0
    private onRegisterCB?: () => void
    private onUpdateCB?: (anim: AnimeInstance) => void

    public addStep(id: ID, register: Step['register'], options?: any) {
        this.steps.push({ id, register, options })
        this.addStepDone()
    }

    private addStepDone = debounce(() => {
        this.createLine()
        this.onRegisterCB && this.onRegisterCB()
        this.line!.seek(0)
    }, STEP_ADD_DEBOUNCE)

    public onRegister(cb: () => void) {
        this.onRegisterCB = cb
    }

    public onUpdate(cb: (anim: AnimeInstance) => void) {
        console.log('onUpdate')
        this.onUpdateCB = cb
    }

    public seek(ms: number) {
        this.pause()
        this.line && this.line.seek(ms)
        this.lastStepPosition = ms - (ms % STEP_DURATION)
    }

    public seekByPercent(percent: number) {
        if (!this.line) return
        const pos = percent * this.line.duration
        this.seek(pos)
    }

    public pause() {
        this.line && this.line.pause()
    }

    public next() {
        this.line && this.line.play()
    }

    public back() {
        const position = Math.max(this.lastStepPosition - STEP_DURATION, 0)
        this.seek(position)
    }

    private handleUpdate = (anim: AnimeInstance) => {
        this.onUpdateCB && this.onUpdateCB(anim)
        if (anim.currentTime > this.lastStepPosition + STEP_DURATION) {
            const position = this.lastStepPosition + STEP_DURATION
            this.seek(position)
        }
    }

    private createLine() {
        this.line = animejs.timeline({
            autoplay: false,
            duration: STEP_DURATION,
            update: this.handleUpdate,
        })

        this.steps.sort(sortSteps)

        this.steps.forEach((step, index) => {
            const prefStep = this.steps[index - 1]
            const stepOptions: AnimeAnimParams = step.register()

            if ((prefStep && sameStep(prefStep.id, step.id)) || index === 0) {
                this.line!.add(stepOptions, `-=${STEP_DURATION}`)
            } else {
                this.line!.add(stepOptions)
            }
        })
    }
}

const sameStep = (id1: ID, id2: ID) => {
    const [id1abs, id2abs] = [id1, id2].map(id => id.map(i => Math.abs(i)))
    return isEqual(id1abs, id2abs)
}

const sortSteps = (a: Step, b: Step) => {
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
    if (aEnd < 0 || bEnd < 0) {
        return Math.abs(aEnd) - Math.abs(bEnd)
    }
    return aEnd - bEnd
}

export const TimelineContext = createContext<Timeline>({} as any)
