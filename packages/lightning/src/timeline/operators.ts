import { linear } from '../helpers'
import {
    Easing,
    RenderOperatorFunction,
    SetValues,
    TweenValues,
    FrameType,
    FramesFunction,
} from '../types'

export const fromTo = (
    values: TweenValues,
    duration: number,
    easing: Easing = linear,
): RenderOperatorFunction => start => renderer => {
    return [
        {
            type: FrameType.Tween,
            start,
            startIndex: 0,
            duration,
            values,
            renderer,
            easing,
        },
    ]
}

export const set = (values: SetValues): RenderOperatorFunction => start => renderer => {
    return [
        {
            type: FrameType.Set,
            start,
            startIndex: 0,
            duration: 0,
            values,
            renderer,
        },
    ]
}

export const delay = (duration: number): FramesFunction => start => {
    return [
        {
            type: FrameType.Delay,
            start,
            startIndex: 0,
            duration,
        },
    ]
}

export const pause = (): FramesFunction => start => {
    return [
        {
            type: FrameType.Pause,
            start,
            startIndex: 0,
            duration: 0,
        },
    ]
}
