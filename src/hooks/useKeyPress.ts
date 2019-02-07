import { useState, useEffect } from 'react'

interface IKeyDownEvent {
    key: string
}

export function useKeyPress(...targetKey: string[]) {
    const [keyPressed, setKeyPressed] = useState(false)

    const downHandler = (event: IKeyDownEvent) => {
        if (targetKey.includes(event.key)) {
            setKeyPressed(true)
        }
    }

    const upHandler = (event: IKeyDownEvent) => {
        if (targetKey.includes(event.key)) {
            setKeyPressed(false)
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', downHandler)
        window.addEventListener('keyup', upHandler)

        return () => {
            window.removeEventListener('keydown', downHandler)
            window.removeEventListener('keyup', upHandler)
        }
    }, [])

    return keyPressed
}
