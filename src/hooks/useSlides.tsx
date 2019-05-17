import { useEffect } from 'react'
import { useKeyPress } from './useKeyPress'

export const useSlides = () => {
    const nextPress = useKeyPress(' ', 'ArrowRight', 'd')
    const prevPress = useKeyPress('Backspace', 'ArrowLeft', 'a')

    useEffect(() => {
        if (nextPress) console.log(+1)
        if (prevPress) console.log(-1)
    }, [nextPress, prevPress])
}
