import {
    SimpleTrailFunction,
    LightTrailsInstance,
    lightTrails,
    parallel,
    pause,
    sequence,
    delay,
} from 'light-trails'
import { debounce, isEqual } from 'lodash'
import { createContext } from 'react'
import { ID } from '../types/ID'
import { inRenderMode } from '../env'

export interface TimelineOptions {
    animateWithNext?: boolean
    title?: string
    deps?: boolean[]
}

interface Step {
    id: ID
    getStepFrames: () => SimpleTrailFunction
    options?: TimelineOptions
}

type TimelineUpdateCallback = (ms: number, duration: number) => void

const STEP_ADD_DEBOUNCE = 700

export const TimelineContext = createContext<Timeline>({} as Timeline)

export class Timeline {
    public steps: Step[] = []
    private line?: LightTrailsInstance
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

    public snapToClosestPause() {
        if (!this.line) return
        const { currentTime } = this.line.getStatus()
        const nextTime = this.line.findNextPauseTime()
        const prevTime = this.line.findPrevPauseTime()
        const closest = [nextTime, prevTime].reduce((prev, curr) =>
            Math.abs(curr - currentTime) < Math.abs(prev - currentTime) ? curr : prev,
        )
        this.seek(closest)
    }

    public pause() {
        this.line && this.line.pause()
    }

    public next() {
        if (!this.line) return

        if (this.line.getStatus().playing) {
            this.startTurboMode()
        }

        if (this.turboMode) {
            this.startTurboMode() // Keep turboMode timer active
            const nextTime = this.line.findNextPauseTime()
            this.line.pause()
            this.line.seek(nextTime, Infinity)
        } else {
            this.line.play()
        }
    }

    public back() {
        if (!this.line) return
        const prevTime = this.line.findPrevPauseTime()
        this.line.seek(prevTime, Infinity) // Infinity for skipping current pause()
    }

    private turboMode = false
    private turboTimer: any
    private startTurboMode() {
        this.turboMode = true

        clearTimeout(this.turboTimer)
        this.turboTimer = setTimeout(() => {
            this.turboMode = false
        }, 800)
    }

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
                inRenderMode ? delay(5000) : pause(),
            ]),
        )

        this.line = lightTrails(frames, {
            onUpdate: () => this.handleUpdate(),
        })

        this.line.prepare()

        this.line.seek(this.getLastTime())
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
