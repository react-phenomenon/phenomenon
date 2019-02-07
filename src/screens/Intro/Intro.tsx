import React, { useEffect } from 'react'
import { useKeyPress } from '../../hooks/useKeyPress'
import { useRouter } from '../../hooks/useRouter'

export const Intro = () => {
    const { history } = useRouter()
    const nextPage = useKeyPress(' ', 'ArrowRight', 'd', 'Enter')

    useEffect(() => {
        if (nextPage) history.push('/slides')
    }, [nextPage])

    return <h1>Hello there!</h1>
}
