import { lightning } from '../lightning'
import { createRootEl } from './el/createRootEl'
import { createBarEl } from './el/createBarEl'
import { inspectorOptions } from './inspectorOptions'
import { createLineEl } from './el/createLineEl'
import { createSeekEl } from './el/createSeekEl'
import { shouldSkipItem } from '../renderer/render'

export const inspector = (anim: ReturnType<typeof lightning>) => {
    let currentTime = 0,
        currentTimeIndex = 0

    const rootEl = createRootEl(inspectorOptions)
    const barsWrapperEl = document.createElement('div')
    const lineEl = createLineEl(inspectorOptions)
    const seekEl = createSeekEl(inspectorOptions, off => anim.seek(off))

    const userOptions = { ...anim.__dev.options }

    inspectorOptions.scale = anim.total / (inspectorOptions.width - 100)

    anim.__dev.options.onUpdate = () => {
        const status = anim.getStatus()
        currentTime = status.currentTime
        currentTimeIndex = status.currentTimeIndex
        userOptions.onUpdate?.()
        render()
    }

    const render = () => {
        barsWrapperEl.innerHTML = ''
        anim.__dev.serialized.forEach(item => {
            barsWrapperEl.appendChild(
                createBarEl(
                    item,
                    inspectorOptions,
                    shouldSkipItem(currentTime, currentTimeIndex, item),
                ),
            )
        })
        lineEl.update(currentTime)
        lineEl.el.scrollIntoView({ behavior: 'auto', inline: 'center' })
    }

    render()

    rootEl.appendChild(seekEl)
    rootEl.appendChild(barsWrapperEl)
    rootEl.appendChild(lineEl.el)
    document.body.appendChild(rootEl)
}
