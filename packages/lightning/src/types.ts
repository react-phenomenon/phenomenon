export enum Type {
    Tween = 'Tween',
    Set = 'Set',
    Delay = 'Delay',
    Action = 'Action',
    Pause = 'Pause',
}

interface SerializedStep {
    type: Type
    start: number
    startIndex: number
    duration: number
}

export interface SerializedSet extends SerializedStep {
    type: Type.Set
    duration: 0
    element: HTMLElement
    values: SetValues
}

export interface SerializedPause extends SerializedStep {
    type: Type.Pause
    duration: 0
}

export interface SerializedDelay extends SerializedStep {
    type: Type.Delay
}

export interface SerializedTween extends SerializedStep {
    type: Type.Tween
    element: HTMLElement
    values: TweenValues
    easing: Easing
}

export type SerializedItem =
    | SerializedSet
    | SerializedTween
    | SerializedPause
    | SerializedDelay

export interface SetValues {
    [key: string]: [any, any]
}

export interface TweenValues {
    [key: string]: (p: number) => any
}

export type Easing = (p: number) => number

export type AnimationFunction = (startAt: number) => SerializedItem[]

export type ElementOperatorFunction = (
    startAt: number,
) => (element: HTMLElement) => SerializedItem[]

export type OperatorFunction = ElementOperatorFunction | AnimationFunction
