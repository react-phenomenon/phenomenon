import React, { FC, useContext, useEffect, useRef } from 'react'
import { Deck } from '../components/Deck'
import { Slide } from '../components/Slide'
import { TimelineContext } from '../lib/Timeline'

const Text: FC<{ p: number; i: number }> = props => {
    const timeline = useContext(TimelineContext)
    const ref = useRef(null)

    useEffect(() => {
        timeline.addStep([props.p, props.i], (tl: any) => {
            tl.add({
                targets: ref.current,
                easing: 'easeInOutQuad',
                opacity: [0, 1],
            })
        })
    }, [])

    return <p ref={ref}>{props.children}</p>
}

export const App = () => {
    return (
        <Deck>
            <Slide i={1}>
                <h1>Slide 1</h1>
                <Text p={1} i={1}>
                    Hello 1
                </Text>
                <Text p={1} i={2}>
                    Hello 2
                </Text>
                <Text p={1} i={3}>
                    Hello 3
                </Text>
            </Slide>
            <Slide i={2}>
                <h1>Slide 2</h1>
                <Text p={2} i={1}>
                    Hello 1
                </Text>
                <Text p={2} i={2}>
                    Hello 2
                </Text>
                <Text p={2} i={3}>
                    Hello 3
                </Text>
            </Slide>
            <Slide i={3}>
                <h1>Slide 3</h1>
            </Slide>
        </Deck>
    )
}
