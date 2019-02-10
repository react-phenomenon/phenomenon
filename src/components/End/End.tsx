import { useGlobalState } from '../../state'

interface EndProps {
    step: number
}

export const End = (props: EndProps) => {
    const [pages] = useGlobalState('pages')
    const [currentPage, setCurrentPage] = useGlobalState('currentPage')
    const [currentStep, setCurrentStep] = useGlobalState('currentStep')

    if (currentPage === null) return null

    if (currentStep === props.step) {
        setCurrentStep(0)
        const nextPage = pages[pages.indexOf(currentPage) + 1]
        if (nextPage) setCurrentPage(nextPage)
    }

    return null
}
