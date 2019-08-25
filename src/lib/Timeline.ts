import animejs, { AnimeAnimParams, AnimeInstance, AnimeTimelineInstance } from 'animejs'
import { debounce, isEqual } from 'lodash'
import { createContext } from 'react'
import { ID } from '../types/ID'
import { TimelineMax } from 'gsap'

export interface TimelineOptions {
    offset?: boolean
    title?: string
}

interface Step {
    id: ID
    params: AnimeAnimParams
    options?: TimelineOptions
}

type TimelineUpdateCallback = (ms: number, duration: number) => void

const STEP_DURATION = 500
const STEP_ADD_DEBOUNCE = 100

export const TimelineContext = createContext<Timeline>({} as any)

const stepDefaults: Partial<AnimeAnimParams> = {
    // easing: 'easeInOutQuad',
    duration: STEP_DURATION,
}

export class Timeline {
    public steps: Step[] = []
    private line?: TimelineMax
    private lastStep = 0
    private stepsDuration: number[] = []
    private moving = false
    private onRegisterCB?: () => void
    private onUpdateCB?: TimelineUpdateCallback

    public addStep(step: Step) {
        this.steps.push(step)
        this.addStepDone()
    }

    private addStepDone = debounce(() => {
        this.createLine()
        this.onRegisterCB && this.onRegisterCB()
        // Take previous step and play for update trigger
        // this.seekByStep(this.getLastSeek() - 1)
        this.next()
    }, STEP_ADD_DEBOUNCE)

    public onRegister(cb: () => void) {
        this.onRegisterCB = cb
    }

    public onUpdate(cb: TimelineUpdateCallback) {
        this.onUpdateCB = cb
    }

    public seek(seconds: number) {
        this.pause()
        // this.lastStep = this.stepsDuration.findIndex(duration => duration >= ms)
        this.line && this.line.seek(seconds)
        // this.saveLastSeek(this.lastStep)
    }

    // private saveLastSeek = debounce((ms: number) => {
    //     localStorage.setItem('lastSeek', ms.toString())
    // }, 1000)

    private getLastSeek() {
        const ms = null //localStorage.getItem('lastSeek')
        return ms ? +ms : 0
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
        this.line && this.line.play()
    }

    public back() {
        this.line && this.line.reverse()
    }

    public getDuration() {
        return this.line && this.line.duration()
    }

    public getCurrentTime() {
        return this.line && this.line.time()
    }

    private handleUpdate = () => {
        if (!this.line || !this.onUpdateCB) return

        console.log(this.getCurrentTime())

        this.onUpdateCB(this.getCurrentTime()!, this.getCurrentTime()!)
    }

    private createLine() {
        this.line = new TimelineMax({ paused: true })

        this.steps.sort(sortSteps)

        this.stepsDuration = []
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
                // Fix for first step with minus offset
                const offsetDuration = index === 0 ? undefined : duration / 1000
                this.addToLine(stepParams, offsetDuration)
            } else {
                durationSum += duration
                this.stepsDuration.push(durationSum)

                this.addToLine(stepParams)
            }
        })

        this.line.eventCallback('onUpdate', this.handleUpdate)
    }

    private addToLine(params: AnimeAnimParams, offset?: number) {
        const { targets, duration, ...rest } = params

        this.line!.to(
            targets as any,
            (duration as any) / 1000,
            rest as any,
            offset && `-=${offset}`,
        ).addPause()
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
