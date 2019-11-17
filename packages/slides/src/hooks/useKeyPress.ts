import { useState, useEffect } from 'react'

export function useKeyPress(...targetKey: string[]) {
    const [keyPressed, setKeyPressed] = useState(false)

    useEffect(() => {
        const downHandler = (event: KeyboardEvent) => {
            if (targetKey.includes(event.key)) {
                setKeyPressed(true)
            }
        }

        const upHandler = (event: KeyboardEvent) => {
            if (targetKey.includes(event.key)) {
                setKeyPressed(false)
            }
        }

        window.addEventListener('keydown', downHandler)
        window.addEventListener('keyup', upHandler)

        return () => {
            window.removeEventListener('keydown', downHandler)
            window.removeEventListener('keyup', upHandler)
        }
    }, [targetKey])

    return keyPressed
}
