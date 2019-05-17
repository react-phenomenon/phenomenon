import React, { FC, useRef, useState, useEffect } from 'react'
import { Timeline, TimelineContext } from '../../lib/Timeline'

export const Deck: FC = props => {
    const timelineRef = useRef(new Timeline())
    const timeline = timelineRef.current
    const [rdy, setRdy] = useState(false)

    useEffect(() => {
        timeline.onRegister(() => {
            setRdy(true)
        })
    }, [])

    return (
        <div>
            <div>{rdy ? 'RDY!' : 'Loading…'}</div>
            <input
                type="range"
                defaultValue="0"
                style={{ width: 500 }}
                onChange={e =>
                    timeline.line!.seek(timeline.line!.duration * (+e.target.value / 100))
                }
            />

            <button onClick={() => timeline.line!.play()}>play</button>
            <button onClick={() => timeline.line!.pause()}>pause</button>

            <ol style={{ position: 'absolute', right: 10, top: 10 }}>
                {timeline.steps.map((step, i) => (
                    <li key={step.id.toString() + i}>{step.id.join('.')}</li>
                ))}
            </ol>
            <TimelineContext.Provider value={timeline}>{props.children}</TimelineContext.Provider>
        </div>
    )
}
