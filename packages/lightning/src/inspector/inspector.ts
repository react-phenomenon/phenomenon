import { lightning } from '../lightning'
import { createRootEl } from './el/createRootEl'
import { createBarEl } from './el/createBarEl'
import { inspectorOptions } from './inspectorOptions'
import { createLineEl } from './el/createLineEl'
import { createSeekEl } from './el/createSeekEl'
import { shouldSkipItem } from '../renderer/render'
import { createStatusEl } from './el/createStatusEl'

export const inspector = (anim: ReturnType<typeof lightning>) => {
    let status = anim.getStatus()

    const rootEl = createRootEl(inspectorOptions)
    const barsWrapperEl = document.createElement('div')
    const statusEl = createStatusEl()
    const lineEl = createLineEl(inspectorOptions)
    const seekEl = createSeekEl(inspectorOptions, off => anim.seek(off))

    const userOptions = { ...anim.__dev.options }

    inspectorOptions.scale = anim.total / (inspectorOptions.width - 100)

    anim.__dev.options.onUpdate = () => {
        status = anim.getStatus()
        userOptions.onUpdate?.()
        render()
    }

    anim.__dev.options.onPause = () => {
        status = anim.getStatus()
        userOptions.onPause?.()
        render()
    }

    anim.__dev.options.onComplete = () => {
        status = anim.getStatus()
        userOptions.onComplete?.()
        render()
    }

    const render = () => {
        barsWrapperEl.innerHTML = ''
        anim.__dev.serialized.forEach(item => {
            barsWrapperEl.appendChild(
                createBarEl(
                    item,
                    inspectorOptions,
                    shouldSkipItem(status.currentTime, status.currentTimeIndex, item),
                ),
            )
        })
        lineEl.update(status.currentTime)
        lineEl.el.scrollIntoView({ behavior: 'auto', inline: 'center' })
        statusEl.update(status)
    }

    render()

    rootEl.appendChild(statusEl.el)
    rootEl.appendChild(seekEl)
    rootEl.appendChild(barsWrapperEl)
    rootEl.appendChild(lineEl.el)
    document.body.appendChild(rootEl)
}
