import anime from 'animejs'
import React, { useEffect, useRef, useState } from 'react'
import { End } from '../components/End'

export const Intro = () => {
    const ref = useRef(null)
    const h1ref = useRef(null)
    const [end, setEnd] = useState(false)

    useEffect(() => {
        const timeline = anime.timeline({
            loop: false,
            complete: (_anime: any) => {
                setEnd(true)
            },
            duration: 2000,
            easing: 'easeOutExpo',
            direction: 'alternate',
            autoplay: true,
        })

        timeline
            .add({
                targets: ref.current,
                easing: 'easeInOutQuad',
                opacity: [0, 1],
                // changeComplete: () => {
                //     console.log('ref changeComplet')
                //     timeline.pause()
                // },
            })
            .add({
                targets: h1ref.current,
                easing: 'easeInOutSine',
                translateY: 270,
            })
            .add({
                targets: h1ref.current,
                easing: 'easeInOutSine',
                scale: 0.5,
                opacity: 0,
            })
    }, [])

    return (
        <div ref={ref}>
            <h1 className="header" ref={h1ref}>
                Hello there!
            </h1>
            {end && <End step={0} />}
        </div>
    )
}
