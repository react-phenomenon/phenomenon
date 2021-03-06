import { RefObject, useEffect, useState } from 'react'

export interface Size extends ClientRect {}

export const useElementSize = (ref: RefObject<HTMLElement>): Size | null => {
    const [size, saveSize] = useState<ClientRect | null>(null)

    useEffect(() => {
        if (!size && ref.current) {
            const rect = ref.current.getBoundingClientRect()
            if (rect.width && rect.height) {
                saveSize(rect)
            }
        }
    }, [size, ref])

    return size
}
