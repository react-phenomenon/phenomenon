import React, { ReactNode } from 'react'
import { useGlobalState } from '../../state'
import { findPages } from './lib/findPages'
import { useSlides } from '../../hooks/useSlides'

type SlidesProps = {
    children?: ReactNode
}

export const Slides = (props: SlidesProps) => {
    useSlides()
    const [allPages, updateAllPages] = useGlobalState('pages')
    const [currentPage, updateCurrentPage] = useGlobalState('currentPage')

    if (!allPages.length) {
        const pages = findPages(props.children)
        if (pages.length < 1) return null

        updateCurrentPage(pages[0])
        updateAllPages(pages)
    }

    if (!allPages && !currentPage) return null

    return <div>{props.children}</div>
}
