export enum Type {
    Pause = 'Pause',
    Delay = 'Delay',
    Set = 'Set',
    Tween = 'Tween',
}

interface SerializedStep {
    type: Type
    start: number
    startIndex: number
    duration: number
}

export type Renderer = (values: Values) => void

export interface SerializedPause extends SerializedStep {
    type: Type.Pause
    duration: 0
}

export interface SerializedDelay extends SerializedStep {
    type: Type.Delay
}

export interface SerializedSet extends SerializedStep {
    type: Type.Set
    duration: 0
    values: SetValues
    renderer: Renderer
}

export interface SerializedTween extends SerializedStep {
    type: Type.Tween
    values: TweenValues
    renderer: Renderer
    easing: Easing
}

export type SerializedItem =
    | SerializedSet
    | SerializedTween
    | SerializedPause
    | SerializedDelay

export interface Values {
    [key: string]: any
}

export interface SetValues {
    [key: string]: [any, any]
}

export interface TweenValues {
    [key: string]: (p: number) => any
}

export type Easing = (p: number) => number

export type AnimationFunction = (startAt: number) => SerializedItem[]

export type RenderOperatorFunction = (
    startAt: number,
) => (renderer: Renderer) => SerializedItem[]

export type OperatorFunction = RenderOperatorFunction | AnimationFunction
