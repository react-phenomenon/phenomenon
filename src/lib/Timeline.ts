import { debounce, last, first, isEqual } from "lodash";
import animejs, { AnimeTimelineInstance, AnimeAnimParams } from "animejs";
import { createContext } from "react";

type ID = number[]

interface Step {
    id: ID
    register: () => AnimeAnimParams
    options?: any
}

const DURATION = 500;

export class Timeline {
    public steps: Step[] = []
    public addStep(id: ID, register: Step['register'], options?: any) {
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
    }, 100)

    public line?: AnimeTimelineInstance

    private createLine() {
        this.line = animejs.timeline({
            autoplay: false,
            duration: DURATION
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

            if (aEnd < 0 || bEnd < 0) {
                return Math.abs(aEnd) - Math.abs(bEnd)
            }

            return aEnd - bEnd
        })

        this.steps.forEach((step, index) => {
            const prefStep = this.steps[index - 1];
            const stepOptions = step.register()

            if (prefStep && sameStep(prefStep.id, step.id)) {
                this.line!.add(stepOptions, `-=${DURATION}`);
            } else {
                this.line!.add(stepOptions);
            }

        })
    }
}

const sameStep = (id1: ID, id2: ID) => {
    const [id1abs, id2abs] = [id1, id2].map(id => id.map(i => Math.abs(i)))
    return isEqual(id1abs, id2abs);
}
export const TimelineContext = createContext<Timeline>({} as any)