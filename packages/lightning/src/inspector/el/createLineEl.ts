import { InspectorOptions } from '../inspectorOptions'

export const createLineEl = (options: InspectorOptions) => {
    const el = document.createElement('div')

    el.style.position = 'absolute'
    el.style.left = '0px'
    el.style.top = '0'
    el.style.bottom = '0'
    el.style.backgroundColor = 'white'
    el.style.width = '1px'
    el.style.pointerEvents = 'none'
    el.style.opacity = '0.7'

    const update = (timeOffset: number) => {
        el.style.left = `${timeOffset / options.scale}px`
    }

    return { el, update }
}
