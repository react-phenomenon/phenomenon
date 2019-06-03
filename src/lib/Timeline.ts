import animejs, { AnimeAnimParams, AnimeInstance, AnimeTimelineInstance } from 'animejs'
import { debounce, isEqual, uniq } from 'lodash'
import { createContext } from 'react'

type ID = number[]

export interface TimelineOptions {
    offset?: boolean
    title?: string
}

interface Step {
    id: ID
    params: AnimeAnimParams
    options?: TimelineOptions
}

const STEP_DURATION = 500
const STEP_ADD_DEBOUNCE = 100

export const TimelineContext = createContext<Timeline>({} as any)

const stepDefaults: Partial<AnimeAnimParams> = {
    easing: 'easeInOutQuad',
    duration: STEP_DURATION,
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
        this.lastStep = this.stepsDuration.findIndex(duration => duration >= ms)
        this.line && this.line.seek(ms)
    }

    public seekByPercent(percent: number) {
        if (!this.line) return
        const pos = percent * this.line.duration
        this.seek(pos)
    }

    public seekByStep(step: number) {
        const duration = this.stepsDuration[step]
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

    public getDuration() {
        return this.line && this.line.duration
    }

    private handleUpdate = (anim: AnimeInstance) => {
        this.onUpdateCB && this.onUpdateCB(anim)

        const nextTime = this.stepsDuration[this.lastStep + 1]

        if (anim.currentTime > nextTime) {
            this.seek(nextTime)
        }
    }

    private createLine() {
        this.line = animejs.timeline({
            autoplay: false,
            duration: STEP_DURATION,
            update: this.handleUpdate,
        })

        this.steps.sort(sortSteps)

        this.stepsDuration = [0]
        let durationSum = 0

        this.steps.forEach((step, index) => {
            const prefStep = this.steps[index - 1] as Step | undefined

            const stepParams: AnimeAnimParams = {
                ...stepDefaults,
                ...step.params,
            }

            const duration = stepParams.duration as number

            if (
                (step.options && step.options.offset) ||
                (prefStep && sameStep(prefStep.id, step.id))
            ) {
                this.addToLine(stepParams, duration)
            } else {
                durationSum += duration
                this.stepsDuration.push(durationSum)

                this.addToLine(stepParams)
            }
        })
    }

    private addToLine(params: AnimeAnimParams, offset?: number) {
        this.line!.add(params, offset && `-=${offset}`)
    }
}

const sameStep = (id1: ID, id2: ID) => {
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
