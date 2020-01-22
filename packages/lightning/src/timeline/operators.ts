import { linear } from '../helpers'
import {
    Easing,
    RenderOperatorFunction,
    SetValues,
    TweenValues,
    Type,
    AnimationFunction,
} from '../types'

export const fromTo = (
    values: TweenValues,
    duration: number,
    easing: Easing = linear,
): RenderOperatorFunction => start => renderer => {
    return [
        {
            type: Type.Tween,
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
            type: Type.Set,
            start,
            startIndex: 0,
            duration: 0,
            values,
            renderer,
        },
    ]
}

export const delay = (duration: number): AnimationFunction => start => {
    return [
        {
            type: Type.Delay,
            start,
            startIndex: 0,
            duration,
        },
    ]
}

export const pause = (): AnimationFunction => start => {
    return [
        {
            type: Type.Pause,
            start,
            startIndex: 0,
            duration: 0,
        },
    ]
}
