import { LightingStatus } from '../../lightning'

const { round } = Math

export const createStatusEl = () => {
    const el = document.createElement('div')
    el.style.padding = '10px 10px 0'
    el.style.fontFamily = 'monospace'

    const update = (status: LightingStatus) => {
        const textStatus = status.playing ? 'Playing' : status.ended ? 'End' : 'Paused'
        el.innerText = `${round(status.currentTime)}/${status.total} [${textStatus}]`
    }

    return { el, update }
}
