export enum Type {
    Tween = 'Tween',
    Set = 'Set',
    Delay = 'Delay',
    Action = 'Action',
    Pause = 'Pause',
}

export interface SerializedSet {
    type: Type.Set
    offset: number
    duration: 0
    element: HTMLElement
    values: SetValues
}

export interface SerializedTween {
    type: Type.Tween
    offset: number
    duration: number
    element: HTMLElement
    values: TweenValues
    easing: Easing
}

export interface SerializedDelay {
    type: Type.Delay
    offset: number
    duration: number
}

export type SerializedItem = SerializedSet | SerializedTween | SerializedDelay

export interface SetValues {
    [key: string]: [any, any]
}

export interface TweenValues {
    [key: string]: (p: number) => any
}

export type Easing = (p: number) => number

export type AnimationFunction = (startAt: number) => SerializedItem[]
