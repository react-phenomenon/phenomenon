import animejs, { AnimeAnimParams, AnimeInstance, AnimeTimelineInstance } from 'animejs'
import { debounce, isEqual } from 'lodash'
import { createContext } from 'react'

type ID = number[]

export interface TimelineOptions {
    offset?: number
    title?: string
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
    private line?: AnimeTimelineInstance
    private lastStep = 0
    private stepsDuration: number[] = []
    private moving = false
    private onRegisterCB?: () => void
    private onUpdateCB?: (anim: AnimeInstance) => void

    public addStep(step: Step) {
        this.steps.push(step)
        this.addStepDone()
    }

    private addStepDone = debounce(() => {
        this.createLine()
        this.onRegisterCB && this.onRegisterCB()
        this.seek(0)
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
        let sum = 0
        this.lastStep = this.stepsDuration.findIndex(duration => {
            if (duration + sum > ms) return true
            sum += duration
            return false
        })
    }

    public seekByPercent(percent: number) {
        if (!this.line) return
        const pos = percent * this.line.duration
        this.seek(pos)
    }

    public seekByStep(step: number) {
        const duration = this.stepsDuration
            .slice(0, step)
            .reduce((prev, current) => prev + current, 0)
        this.seek(duration)
    }

    public pause() {
        this.moving = false
        this.line && this.line.pause()
    }

    public play() {
        this.moving = true
        this.line && this.line.play()
    }

    public next() {
        if (this.moving) {
            this.seekByStep(this.lastStep + 1)
            this.play()
        }
        this.play()
    }

    public back() {
        const step = Math.max(this.lastStep - 1, 0)
        this.seekByStep(step)
    }

    private handleUpdate = (anim: AnimeInstance) => {
        this.onUpdateCB && this.onUpdateCB(anim)

        const currentSlideTime = this.stepsDuration
            .slice(0, this.lastStep + 1)
            .reduce((prev, current) => prev + current, 0)

        if (anim.currentTime > currentSlideTime) {
            this.seek(currentSlideTime)
        }
    }

    private createLine() {
        this.line = animejs.timeline({
            autoplay: false,
            duration: STEP_DURATION,
            update: this.handleUpdate,
        })

        this.steps.sort(sortSteps)

        this.stepsDuration = []

        this.steps.forEach((step, index) => {
            const prefStep = this.steps[index - 1]
            const stepParams = step.params()

            const stepOptions: AnimeAnimParams = {
                ...stepDefaults,
                ...stepParams,
            }

            if (step.options && step.options.offset) {
                return this.addToLine(stepOptions, step.options.offset)
            }

            if (prefStep && sameStep(prefStep.id, step.id)) {
                return this.addToLine(stepOptions, 1)
            }

            return this.addToLine(stepOptions)
        })

        this.stepsDuration = this.line.children.map(el => el.duration)
        // TODO more cleaver way
        // Remove first slide because has -offset
        this.stepsDuration = this.stepsDuration.slice(1, this.stepsDuration.length + 1)
    }

    private addToLine(stepOptions: AnimeAnimParams, offset?: number) {
        this.line!.add(stepOptions, offset && `-=${STEP_DURATION * offset}`)
    }
}

const sameStep = (id1: ID, id2: ID) => {
    // Hmm we -1 = 1  maybe we don't need this
    // const [id1abs, id2abs] = [id1, id2].map(id => id.map(i => Math.abs(i)))
    // return isEqual(id1abs, id2abs)
    return isEqual(id1, id2)
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
