import animejs, { AnimeAnimParams, AnimeInstance, AnimeTimelineInstance } from 'animejs'
import { debounce, isEqual } from 'lodash'
import { createContext } from 'react'

type ID = number[]

export interface TimelineOptions {
    offset: number
}

interface Step {
    id: ID
    params: () => AnimeAnimParams
    options?: TimelineOptions
}

const STEP_DURATION = 500
const STEP_ADD_DEBOUNCE = 100

export const TimelineContext = createContext<Timeline>({} as any)

const stepDefaults: Partial<AnimeAnimParams> = {
    easing: 'easeInOutQuad',
}

export class Timeline {
    public steps: Step[] = []
    public line?: AnimeTimelineInstance
    private lastStepPosition = 0
    private onRegisterCB?: () => void
    private onUpdateCB?: (anim: AnimeInstance) => void

    public addStep({
        id,
        params,
        options,
    }: {
        id: ID
        params: Step['params']
        options?: TimelineOptions
    }) {
        this.steps.push({ id, params, options })
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
            const stepOptions: AnimeAnimParams = {
                ...stepDefaults,
                ...step.params(),
            }

            if (step.options && step.options.offset) {
                return this.addToLine(stepOptions, step.options.offset)
            }

            if (prefStep && sameStep(prefStep.id, step.id)) {
                return this.addToLine(stepOptions, 1)
            }

            return this.addToLine(stepOptions)
        })
    }

    private addToLine(stepOptions: AnimeAnimParams, offset?: number) {
        this.line!.add(stepOptions, offset && `-=${STEP_DURATION * offset}`)
    }
}

const sameStep = (id1: ID, id2: ID) => {
    const [id1abs, id2abs] = [id1, id2].map(id => id.map(i => Math.abs(i)))
    return isEqual(id1abs, id2abs)
}

const sortSteps = (a: Step, b: Step) => {
    const aLen = a.id.length
    const bLen = b.id.length
    const minLen = Math.min(aLen, bLen)
    for (let n = 0; n < minLen; n++) {
        const an = norm(a.id[n])
        const bn = norm(b.id[n])
        if (an < bn) return -1
        if (an > bn) return +1
    }
    return aLen - bLen
}

const norm = (a: number) => Math.abs(a) + (a < 0 ? 0.5 : 0)
