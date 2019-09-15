import { debounce, isEqual } from 'lodash'
import { createContext } from 'react'
import { ID } from '../types/ID'
import { TimelineMax } from 'gsap'

export interface TimelineOptions {
    animateWithNext?: boolean
    title?: string
    deps?: boolean[]
}

interface Step {
    id: ID
    createStepTimeline: (tl: TimelineMax) => void
    ref?: any
    options?: TimelineOptions
    _duration?: number
}

type TimelineUpdateCallback = (ms: number, duration: number) => void

const STEP_ADD_DEBOUNCE = 1000

export const TimelineContext = createContext<Timeline>({} as any)

export class Timeline {
    public steps: Step[] = []
    private line?: TimelineMax
    private onRegisterCB?: () => void
    private onUpdateCB?: TimelineUpdateCallback

    public addStep(step: Step) {
        this.steps.push(step)
        this.addStepDone()
    }

    private addStepDone = debounce(() => {
        this.createLine()
        this.onRegisterCB && this.onRegisterCB()
    }, STEP_ADD_DEBOUNCE)

    public onRegister(cb: () => void) {
        this.onRegisterCB = cb
    }

    public onUpdate(cb: TimelineUpdateCallback) {
        this.onUpdateCB = cb
    }

    public seek(seconds: number) {
        this.pause()
        this.line && this.line.seek(seconds)
    }

    public seekByPercent(percent: number) {
        if (!this.line) return
        const pos = percent * this.line.duration()
        this.seek(pos)
    }

    public pause() {
        this.line && this.line.pause()
    }

    public next() {
        if (!this.line) return
        if (this.line.isActive()) {
            this.line.seek(this.line.time() + 1)
        }
        this.line.play()
    }

    public back() {
        if (!this.line) return
        if (this.line.isActive()) {
            this.line.seek(this.line.time() - 1)
        }
        this.line.reverse()
    }

    public getDuration() {
        return this.line && this.line.duration()
    }

    public getCurrentTime() {
        return this.line && this.line.time()
    }

    private handleUpdate = () => {
        if (!this.line || !this.onUpdateCB) return
        this.onUpdateCB(this.getCurrentTime()!, this.getDuration()!)
    }

    private createLine() {
        if (this.line) {
            // tslint:disable-next-line: no-console
            console.warn('[Timeline] this.line already exists!')
        }

        this.line = new TimelineMax({ paused: true })

        this.steps.sort(sortSteps)

        this.steps.forEach((step, index) => {
            this.addToLine(step, index)
        })

        this.line.eventCallback('onUpdate', this.handleUpdate)
    }

    private addToLine(step: Step, index: number) {
        const { id, createStepTimeline, options = {} } = step

        if (!this.line) return

        const stepTimeline = new TimelineMax()
        createStepTimeline(stepTimeline)

        // Store duration in steps for "same step" behavior
        const duration = stepTimeline.duration()
        this.steps[index]._duration = duration

        const prevDuration = this.getSameStepOffset(id, index)

        if ((options.animateWithNext || prevDuration) && index > 0) {
            const offset = Math.min(duration, prevDuration || Infinity)

            this.line.removePause(this.line.duration())
            this.line.add(stepTimeline, `-=${offset}`).addPause()
            return
        }

        this.line.add(stepTimeline).addPause()
    }

    private getSameStepOffset(id: ID, index: number): number {
        const prevStep = this.steps[index - 1]

        if (!prevStep || !isSameStep(id, prevStep.id)) {
            return 0
        }

        return prevStep._duration || 0
    }
}

const isSameStep = (id1: ID, id2: ID) => {
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
