import { debounce, isEqual } from 'lodash'
import { createContext } from 'react'
import { ID } from '../types/ID'
import {
    FramesFunction,
    LightingInstance,
    lightning,
    sequence,
    pause,
    parallel,
    inspector,
} from '@phenomenon/lightning'

export interface TimelineOptions {
    animateWithNext?: boolean
    title?: string
    deps?: boolean[]
}

interface Step {
    id: ID
    getStepFrames: () => FramesFunction
    options?: TimelineOptions
}

type TimelineUpdateCallback = (ms: number, duration: number) => void

const STEP_ADD_DEBOUNCE = 700

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
        const { currentTime } = this.line.getStatus()
        this.line.seek(currentTime - 1000)
        this.line.play()
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
            this.getGroupedSteps().flatMap(group => [
                parallel(group.map(step => step.getStepFrames())),
                pause(),
            ]),
        )

        this.line = lightning(frames, {
            onUpdate: () => this.handleUpdate(),
        })

        // inspector(this.line)

        this.line.prepare()

        this.line.seek(this.getLastTime())
        // this.line.play()  // Seeks before pause() TODO?
    }

    private getGroupedSteps(): Step[][] {
        const groupedSteps: Step[][] = []

        for (let i = 0; i < this.steps.length; i++) {
            const step = this.steps[i]
            const lastGroup = groupedSteps[groupedSteps.length - 1]

            if (
                lastGroup &&
                (step.options?.animateWithNext || isEqual(step.id, lastGroup[0].id))
            ) {
                lastGroup.push(step)
            } else {
                groupedSteps.push([step])
            }
        }

        return groupedSteps
    }
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
