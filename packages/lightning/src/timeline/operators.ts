import { linear } from '../helpers'
import {
    Easing,
    SerializedDelay,
    SerializedItem,
    SerializedPause,
    SerializedSet,
    SerializedTween,
    SetValues,
    TweenValues,
    Type,
} from '../types'

export type OperatorFunction = (start: number, element: HTMLElement) => SerializedItem

export const fromTo = (
    values: TweenValues,
    duration: number,
    easing: Easing = linear,
): OperatorFunction => (start, element): SerializedTween => {
    return {
        type: Type.Tween,
        start,
        startIndex: 0,
        duration,
        element,
        values,
        easing,
    }
}

export const set = (values: SetValues): OperatorFunction => (
    start,
    element,
): SerializedSet => {
    return {
        type: Type.Set,
        start,
        startIndex: 0,
        duration: 0,
        element,
        values,
    }
}

export const delay = (duration: number): OperatorFunction => (start): SerializedDelay => {
    return {
        type: Type.Delay,
        start,
        startIndex: 0,
        duration,
    }
}

export const pause = (): OperatorFunction => (start): SerializedPause => {
    return {
        type: Type.Pause,
        start,
        startIndex: 0,
        duration: 0,
    }
}
