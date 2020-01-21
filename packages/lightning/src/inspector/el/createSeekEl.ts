import { InspectorOptions } from '../inspectorOptions'

export const createSeekEl = (
    options: InspectorOptions,
    onSeek: (offset: number) => void,
) => {
    const el = document.createElement('div')

    el.style.backgroundColor = 'rgba(0,0,0,.5)'
    el.style.height = '50px'
    el.style.webkitUserSelect = null
    el.style.cursor = 'col-resize'

    let seeking = false

    el.onmousedown = event => {
        seeking = true
        onSeek(event.offsetX * options.scale)
    }

    el.onmouseup = () => {
        seeking = false
    }

    el.onmousemove = event => {
        if (seeking) {
            onSeek(event.offsetX * options.scale)
        }
    }

    return el
}
