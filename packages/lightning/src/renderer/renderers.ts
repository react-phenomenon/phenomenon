import { Renderer } from '../types'

export const htmlElementRenderer = (selector: HTMLElement | string): Renderer => {
    const element =
        typeof selector === 'string'
            ? (document.querySelector(selector) as HTMLElement | null)
            : selector

    if (!element) {
        throw new Error(`[lighting] Element (${selector}) not found`)
    }

    const renderer: Renderer = values => {
        const { text, ...styles } = values

        setCssValue(element, styles)

        if (text !== undefined) {
            element.textContent = text
        }
    }
    ;(renderer as any).__EL = element

    return renderer
}

export const setCssValue = (el: HTMLElement, value: any) => {
    Object.assign(el.style, value)
}
