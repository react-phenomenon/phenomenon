declare module 'animejs' {
    type FunctionBasedParamter = (element: HTMLElement, index: number, length: number) => number
    type AnimeCallbackFunction = (anim: AnimeInstance) => void
    // Allowing null is necessary because DOM queries may not return anything.
    type AnimeTarget = string | object | HTMLElement | SVGElement | NodeList | null

    type EasingOptions =
        | 'linear'
        | 'easeInQuad'
        | 'easeInCubic'
        | 'easeInQuart'
        | 'easeInQuint'
        | 'easeInSine'
        | 'easeInExpo'
        | 'easeInCirc'
        | 'easeInBack'
        | 'easeInElastic'
        | 'easeOutQuad'
        | 'easeOutCubic'
        | 'easeOutQuart'
        | 'easeOutQuint'
        | 'easeOutSine'
        | 'easeOutExpo'
        | 'easeOutCirc'
        | 'easeOutBack'
        | 'easeOutElastic'
        | 'easeInOutQuad'
        | 'easeInOutCubic'
        | 'easeInOutQuart'
        | 'easeInOutQuint'
        | 'easeInOutSine'
        | 'easeInOutExpo'
        | 'easeInOutCirc'
        | 'easeInOutBack'
        | 'easeInOutElastic'
    type DirectionOptions = 'reverse' | 'alternate' | 'normal'

    export interface AnimeInstanceParams {
        loop?: number | boolean
        autoplay?: boolean
        direction?: DirectionOptions | string

        begin?: AnimeCallbackFunction
        run?: AnimeCallbackFunction
        update?: AnimeCallbackFunction
        complete?: AnimeCallbackFunction
    }

    export interface AnimeAnimParams {
        targets: AnimeTarget | ReadonlyArray<AnimeTarget>

        duration?: number | FunctionBasedParamter
        delay?: number | FunctionBasedParamter
        elasticity?: number | FunctionBasedParamter
        round?: number | boolean | FunctionBasedParamter

        easing?: EasingOptions | string | ReadonlyArray<number>

        begin?: AnimeCallbackFunction
        run?: AnimeCallbackFunction
        update?: AnimeCallbackFunction
        complete?: AnimeCallbackFunction
        [AnyAnimatedProperty: string]: any
    }

    export interface AnimeParams extends AnimeInstanceParams, AnimeAnimParams {
        // Just need this to merge both Params interfaces.
    }

    export interface AnimeInstance {
        play(): void
        pause(): void
        restart(): void
        reverse(): void
        seek(time: number): void

        began: boolean
        paused: boolean
        completed: boolean
        finished: Promise<void>

        begin: AnimeCallbackFunction
        run: AnimeCallbackFunction
        update: AnimeCallbackFunction
        complete: AnimeCallbackFunction

        autoplay: boolean
        currentTime: number
        delay: number
        direction: string
        duration: number
        loop: number | boolean
        offset: number
        progress: number
        remaining: number
        reversed: boolean

        animatables: ReadonlyArray<object>
        animations: ReadonlyArray<object>
    }

    export interface AnimeTimelineAnimParams extends AnimeAnimParams {
        offset: number | string | FunctionBasedParamter
    }

    export interface AnimeTimelineInstance extends AnimeInstance {
        add(params: AnimeAnimParams, offset?: number | string): AnimeTimelineInstance
    }

    // Helpers
    const speed: number
    const running: AnimeInstance[]
    const easings: { [EasingFunction: string]: (t: number) => any }
    function remove(targets: AnimeTarget | ReadonlyArray<AnimeTarget>): void
    function getValue(targets: AnimeTarget, prop: string): string | number
    function path(
        path: string | HTMLElement | SVGElement | null,
        percent?: number,
    ): (
        prop: string,
    ) => {
        el: HTMLElement | SVGElement
        property: string
        totalLength: number
    }
    function setDashoffset(el: HTMLElement | SVGElement | null): number
    function bezier(x1: number, y1: number, x2: number, y2: number): (t: number) => number
    // Timeline
    function timeline(
        params?: Partial<AnimeInstanceParams> & Partial<AnimeInstance> & Partial<AnimeAnimParams>,
    ): AnimeTimelineInstance
    function random(min: number, max: number): number

    function animejs(params: AnimeParams): AnimeInstance
    animejs.timeline = timeline

    export default animejs
}
