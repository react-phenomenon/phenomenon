import { linear } from '../helpers'
import {
    Easing,
    SerializedSet,
    SerializedTween,
    SetValues,
    TweenValues,
    Type,
    SerializedItem,
    SerializedDelay,
} from '../types'

export type OperatorFunction = (offset: number, element: HTMLElement) => SerializedItem

export const fromTo = (
    values: TweenValues,
    duration: number,
    easing: Easing = linear,
): OperatorFunction => (offset: number, element: HTMLElement): SerializedTween => {
    return {
        type: Type.Tween,
        offset,
        duration,
        element,
        values,
        easing,
    }
}

export const set = (values: SetValues): OperatorFunction => (
    offset: number,
    element: HTMLElement,
): SerializedSet => {
    return {
        type: Type.Set,
        offset,
        duration: 0,
        element,
        values,
    }
}

export const delay = (duration: number): OperatorFunction => (
    offset: number,
    element: HTMLElement,
): SerializedDelay => {
    return {
        type: Type.Delay,
        offset,
        duration,
    }
}
