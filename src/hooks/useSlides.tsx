import { useEffect } from 'react'
import { useGlobalState } from '../state'
import { useKeyPress } from './useKeyPress'

export const useSlides = () => {
    const nextPress = useKeyPress(' ', 'ArrowRight', 'd')
    const prevPress = useKeyPress('Backspace', 'ArrowLeft', 'a')
    const [currentStep, setCurrentStep] = useGlobalState('currentStep')

    useEffect(() => {
        if (nextPress) setCurrentStep(currentStep + 1)
        if (prevPress) setCurrentStep(currentStep - 1)
    }, [nextPress, prevPress])

    return currentStep
}
