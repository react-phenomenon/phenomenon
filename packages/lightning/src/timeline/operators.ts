import { linear } from '../helpers'
import {
    Easing,
    ElementOperatorFunction,
    SetValues,
    TweenValues,
    Type,
    AnimationFunction,
} from '../types'

export const fromTo = (
    values: TweenValues,
    duration: number,
    easing: Easing = linear,
): ElementOperatorFunction => start => element => {
    return [
        {
            type: Type.Tween,
            start,
            startIndex: 0,
            duration,
            element,
            values,
            easing,
        },
    ]
}

export const set = (values: SetValues): ElementOperatorFunction => start => element => {
    return [
        {
            type: Type.Set,
            start,
            startIndex: 0,
            duration: 0,
            element,
            values,
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
