import useComponentSize, { ComponentSize } from '@rehooks/component-size'
import { RefObject, useEffect, useState } from 'react'

export interface Size extends ComponentSize {}

export const useElementSize = (ref: RefObject<HTMLElement>): Size | null => {
    const size = useComponentSize(ref)
    const [savedSize, saveSize] = useState<ComponentSize | null>(null)

    useEffect(() => {
        if (size.height && size.width) {
            return saveSize(size)
        }
    }, [size, savedSize])

    return savedSize
}
