import { debounce, last, first } from "lodash";
import animejs, { AnimeTimelineInstance } from "animejs";
import { createContext } from "react";

interface Step {
    id: number[]
    register: (tl: any) => void
    options?: any
}

export class Timeline {
    public steps: Step[] = []
    public addStep(id: number[], register: (tl: any) => void, options?: any) {
        this.steps.push({ id, register, options })
        this.done()
    }

    private onRegisterCB: any
    public onRegister(cb: any) {
        this.onRegisterCB = cb
    }

    private done = debounce(() => {
        this.createLine()
        this.onRegisterCB()
    }, 1000)

    public line?: AnimeTimelineInstance

    private createLine() {
        this.line = animejs.timeline({
            autoplay: false,
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

export const TimelineContext = createContext<Timeline>({} as any)