import { lightning } from './lightning'
import { Type } from './types'

const width = window.innerWidth - 20
const scale = 4

export const inspector = (anim: ReturnType<typeof lightning>) => {
    const master = document.createElement('div')

    master.style.position = 'absolute'
    master.style.overflow = 'auto'
    master.style.left = '10px'
    master.style.bottom = '110px'
    master.style.backgroundColor = 'rgba(0,0,0,.1)'
    master.style.width = width + 'px'

    anim.__dev.serialized.forEach(item => {
        const el = document.createElement('div')

        if ('element' in item) {
            el.textContent = `[${item.element.tagName}] ${item.type}`
        } else {
            el.textContent = `${item.type} ${item.duration}`
        }

        el.title = `[${item.start} - ${item.start + item.duration}]  ${item.type}`

        if ('values' in item) {
            const values = ` (${Object.keys(item.values).join(', ')})`
            el.textContent += values
            el.title += values
        }

        el.onclick = () => {
            // eslint-disable-next-line no-console
            console.log(item)
        }

        el.style.height = '20px'
        el.style.lineHeight = '20px'
        el.style.fontSize = '10px'
        el.style.textIndent = '5px'
        el.style.color = 'black'
        el.style.overflow = 'hidden'
        el.style.whiteSpace = 'nowrap'
        el.style.backgroundColor = bg[item.type]
        el.style.marginBottom = '1px'
        el.style.marginLeft = item.start / scale + 'px'
        el.style.width = Math.max(100, item.duration / scale) + 'px'

        master.appendChild(el)
    })

    document.body.appendChild(master)
}

const bg: Record<Type, string> = {
    [Type.Tween]: '#abc123',
    [Type.Set]: 'gray',
    [Type.Delay]: 'white',
    [Type.Action]: 'gray',
    [Type.Pause]: 'gray',
}
