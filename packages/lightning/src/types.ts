export enum FrameType {
    Pause = 'Pause',
    Delay = 'Delay',
    Set = 'Set',
    Tween = 'Tween',
}

interface SerializedFrameStep {
    type: FrameType
    startAt: number
    startIndex: number
    duration: number
}

export type Renderer = (values: Values) => void

export interface SerializedFramePause extends SerializedFrameStep {
    type: FrameType.Pause
    duration: 0
}

export interface SerializedFrameDelay extends SerializedFrameStep {
    type: FrameType.Delay
}

export interface SerializedFrameSet extends SerializedFrameStep {
    type: FrameType.Set
    duration: 0
    values: SetValues
    renderer: Renderer
}

export interface SerializedFrameTween extends SerializedFrameStep {
    type: FrameType.Tween
    values: TweenValues
    renderer: Renderer
    easing: Easing
}

export type SerializedFrame =
    | SerializedFrameSet
    | SerializedFrameTween
    | SerializedFramePause
    | SerializedFrameDelay

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

export type FramesFunction = (startAt: number) => SerializedFrame[]

export type RenderOperatorFunction = (
    startAt: number,
) => (renderer: Renderer) => SerializedFrame[]

export type OperatorFunction = RenderOperatorFunction | FramesFunction
