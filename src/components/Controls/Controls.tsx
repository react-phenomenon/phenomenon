import React, { FC, useEffect, createRef } from 'react'
import { Timeline } from '../../lib/Timeline'
import { useKeyPress } from '../../hooks/useKeyPress'

interface ControlsProps {
    timeline: Timeline
}

export const Controls: FC<ControlsProps> = props => {
    const { timeline } = props
    const inputRef = createRef<HTMLInputElement>()

    useEffect(() => {
        const ref = inputRef.current
        if (ref) {
            timeline.onUpdate(anim => {
                ref.value = ((anim.currentTime / anim.duration) * 100).toString()
            })
        }
    }, [])

    const nextPress = useKeyPress(' ', 'ArrowRight', 'd')
    const prevPress = useKeyPress('Backspace', 'ArrowLeft', 'a')

    useEffect(() => {
        if (nextPress) timeline.next()
        if (prevPress) timeline.back()
    }, [nextPress, prevPress])

    return (
        <div className="container">
            <input
                ref={inputRef}
                type="range"
                defaultValue="0"
                style={{ width: 500 }}
                onMouseUp={() => timeline.next()}
                onChange={e => timeline.seekByPercent(+e.target.value / 100)}
            />

            <button onClick={() => timeline.back()}>←</button>
            <button onClick={() => timeline.next()}>→</button>
            <button onClick={() => timeline.pause()}>pause</button>

            <ol style={{ position: 'absolute', right: 10, top: 10 }}>
                {timeline.steps.map((step, i) => (
                    <li key={step.id.toString() + i}>{step.id.join('.')}</li>
                ))}
            </ol>
        </div>
    )
}
