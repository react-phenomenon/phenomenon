import { InspectorOptions } from '../inspectorOptions'

export const createRootEl = (options: InspectorOptions) => {
    const el = document.createElement('div')

    el.style.position = 'absolute'
    el.style.overflow = 'auto'
    el.style.left = '10px'
    el.style.bottom = '110px'
    el.style.backgroundColor = 'rgba(0,0,0,.1)'
    el.style.width = options.width + 'px'
    el.style.display = 'grid'
    el.style.gridTemplateRows = '1fr'
    el.style.gridGap = '10px'

    return el
}
