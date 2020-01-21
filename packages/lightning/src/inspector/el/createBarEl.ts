import { SerializedItem, Type } from '../../types'
import { InspectorOptions } from '../inspectorOptions'

const bg: Record<Type, string> = {
    [Type.Tween]: '#abc123',
    [Type.Set]: 'lightgray',
    [Type.Delay]: 'white',
    [Type.Action]: 'lightgray',
    [Type.Pause]: 'lightgray',
}

export const createBarEl = (
    item: SerializedItem,
    options: InspectorOptions,
    skipped: boolean,
) => {
    const el = document.createElement('div')

    if ('element' in item) {
        el.textContent = `[${item.element.tagName}] `
    } else {
        el.textContent = `${item.type}`
    }

    el.title = `[${item.start} - ${item.start + item.duration}] ${item.type}`

    if ('values' in item) {
        const values = ` (${Object.keys(item.values).join(', ')})`
        el.textContent += values
        el.title += values
    }

    el.onclick = () => {
        // eslint-disable-next-line no-console
        console.log(item)
    }

    if ('element' in item) {
        el.onmouseover = () => {
            item.element.style.outline = '2px solid red'
            item.element.style.outlineOffset = '2px'
        }
        el.onmouseout = () => {
            item.element.style.outline = ''
            item.element.style.outlineOffset = ''
        }
    }

    el.style.opacity = skipped ? '0.3' : '1'
    el.style.height = '20px'
    el.style.lineHeight = '20px'
    el.style.fontSize = '10px'
    el.style.textIndent = '5px'
    el.style.color = 'black'
    el.style.overflow = 'hidden'
    el.style.whiteSpace = 'nowrap'
    el.style.marginBottom = '1px'
    el.style.marginLeft = item.start / options.scale + 'px'

    switch (item.type) {
        case Type.Pause:
        case Type.Set:
            el.style.width = 'auto'
            el.style.color = bg[item.type]
            el.style.borderLeft = `2px solid ${bg[item.type]}`
            break

        default:
            el.style.backgroundColor = bg[item.type]
            el.style.width = item.duration / options.scale + 'px'
            break
    }

    return el
}
