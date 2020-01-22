import { setCssValue } from '../helpers'
import { Renderer } from '../types'

export const el = (selector: HTMLElement | string): Renderer => {
    const element =
        typeof selector === 'string'
            ? (document.querySelector(selector) as HTMLElement | null)
            : selector

    if (!element) {
        throw new Error(`[animation] Element ${selector} not found`)
    }

    const renderer: Renderer = values => {
        setCssValue(element, values)
    }
    ;(renderer as any).__EL = element

    return renderer
}
