import { debounce, isEqual } from 'lodash'
import { createContext } from 'react'
import { ID } from '../types/ID'
import {
    FramesFunction,
    LightingInstance,
    lightning,
    sequence,
    pause,
} from '@phenomenon/lightning'

export interface TimelineOptions {
    animateWithNext?: boolean
    title?: string
    deps?: boolean[]
}

interface Step {
    id: ID
    createStepTimeline: () => FramesFunction
    options?: TimelineOptions
}

type TimelineUpdateCallback = (ms: number, duration: number) => void

const STEP_ADD_DEBOUNCE = 1000

export const TimelineContext = createContext<Timeline>({} as Timeline)

export class Timeline {
    public steps: Step[] = []
    private line?: LightingInstance
    private onRegisterCB?: () => void
    private onUpdateCB?: TimelineUpdateCallback

    public addStep(step: Step) {
        this.steps.push(step)
        this.addStepDone()
    }

    private addStepDone = debounce(() => {
        this.createLine()
        this.onRegisterCB && this.onRegisterCB()
        this.runOnUpdateCB()
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
        const pos = percent * this.line.total
        this.seek(pos)
    }

    public pause() {
        this.line && this.line.pause()
    }

    public next() {
        if (!this.line) return
        // if (this.line.isActive()) {
        //     this.turboMode()
        // }
        this.line.play()
    }

    public back() {
        if (!this.line) return
        // if (this.line.isActive()) {
        //     this.turboMode()
        // }
        // this.line.reverse()
    }

    // private turboTimer: any
    // private turboMode() {
    //     if (!this.line) return

    //     this.line.timeScale(5)
    //     clearTimeout(this.turboTimer)
    //     this.turboTimer = setTimeout(() => {
    //         this.line!.timeScale(1)
    //     }, 1000)
    // }

    public getDuration() {
        return this.line && this.line.total
    }

    public getCurrentTime() {
        return this.line && this.line.getStatus().currentTime
    }

    private runOnUpdateCB() {
        if (!this.onUpdateCB) return
        this.onUpdateCB(this.getCurrentTime()!, this.getDuration()!)
    }

    private handleUpdate = () => {
        if (!this.line || !this.onUpdateCB) return
        const currentTime = this.getCurrentTime()!
        this.saveLastTime(currentTime)
        this.runOnUpdateCB()
    }

    private saveLastTime = debounce((time: number) => {
        localStorage.setItem('phenomenon:last-time', time.toString())
    }, 100)

    private getLastTime() {
        const lastTime = localStorage.getItem('phenomenon:last-time')
        if (!lastTime) return 0
        return Number.parseFloat(lastTime) || 0
    }

    private createLine() {
        this.steps.sort(sortSteps)
        const frames = sequence(
            this.steps.map(step => sequence([step.createStepTimeline(), pause()])),
        )

        this.line = lightning(frames, {
            onUpdate: () => this.handleUpdate(),
        })

        // inspector(this.line)

        this.line.prepare()
    }

    // private addToLine(step: Step, index: number) {
    //     if (!this.line) return

    //     const stepTimeline = step._timeline!

    //     const offset = this.getSameStepOffset(step, index)

    //     if (offset && index > 0) {
    //         this.line.removePause(this.line.duration())
    //         this.line.add(stepTimeline, `-=${offset}`).addPause()
    //         return
    //     }

    //     this.line.add(stepTimeline).addPause()
    // }

    // private getSameStepOffset(
    //     { id, _timeline, options = {} }: Step,
    //     index: number,
    // ): number {
    //     const currentDuration = _timeline!.duration()
    //     const prevStep = this.steps[index - 1]

    //     if (prevStep && (options.animateWithNext || isSameStep(id, prevStep.id))) {
    //         const prevDuration = prevStep._timeline!.duration() || 0
    //         // @TODO
    //         // This is how it should be, but:
    //         //   - this breaks "same step" in Frag component… why?
    //         //   - Without this `unwrap`ed steps may have problems… (eg. two step Cmd + one step SwapItem)
    //         // BTW here we should take care about negative offset > timeline duration from this point of time
    //         // return currentDuration

    //         return Math.min(currentDuration, prevDuration || Infinity)
    //     }

    //     // @TODO `animateWithPrev`
    //     // const nextStep = this.steps[index - 1]
    //     // const nextOptions = (nextStep && nextStep.options) || {}

    //     // if (nextStep && (nextOptions.animateWithPrev || isSameStep(id, nextStep.id))) {
    //     //     const nextDuration = nextStep._timeline!.duration() || 0
    //     //     return Math.min(currentDuration, nextDuration)
    //     // }

    //     return 0
    // }
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
