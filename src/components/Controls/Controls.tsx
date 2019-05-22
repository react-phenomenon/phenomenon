import React, { createRef, FC, useEffect } from 'react'
import styled from 'styled-components'
import { useKeyPress } from '../../hooks/useKeyPress'
import { Timeline } from '../../lib/Timeline'

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
        <Container>
            <Line
                ref={inputRef}
                type="range"
                defaultValue="0"
                onMouseUp={() => timeline.next()}
                onChange={e => timeline.seekByPercent(+e.target.value / 100)}
            />
            <ol style={{ position: 'absolute', right: 10, bottom: 40, textAlign: 'left' }}>
                {timeline.steps.map((step, i) => (
                    <li key={step.id.toString() + i}>{step.id.join('.')}</li>
                ))}
            </ol>
        </Container>
    )
}

const Container = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    padding: 20px;
    text-align: center;
`

const Line = styled.input`
    width: 100%;
    -webkit-appearance: none;
    &:focus {
        outline: none;
    }
    &::-webkit-slider-runnable-track {
        width: 100%;
        height: 8px;
        cursor: pointer;
        background: #999;
        border-radius: 2px;
        border: none;
    }
    &::-webkit-slider-thumb {
        border: none;
        height: 20px;
        width: 50px;
        border-radius: 15px;
        background: #ffffff;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -6px;
    }
    &:focus::-webkit-slider-runnable-track {
        background: #999;
    }
    &::-moz-range-track {
        width: 100%;
        height: 8px;
        cursor: pointer;
        background: #999;
        border-radius: 2px;
        border: none;
    }
    &::-moz-range-thumb {
        border: none;
        height: 20px;
        width: 50px;
        border-radius: 15px;
        background: #ffffff;
        cursor: pointer;
    }
    &::-ms-track {
        width: 100%;
        height: 8px;
        cursor: pointer;
        background: transparent;
        border-color: transparent;
        color: transparent;
    }
    &::-ms-fill-lower {
        background: rgba(250, 250, 250, 0.11);
        border: none;
        border-radius: 2.6px;
    }
    &::-ms-fill-upper {
        background: #999;
        border: none;
        border-radius: 2.6px;
    }
    &::-ms-thumb {
        border: none;
        height: 20px;
        width: 50px;
        border-radius: 15px;
        background: #ffffff;
        cursor: pointer;
        height: 8px;
    }
    &:focus::-ms-fill-lower {
        background: #999;
    }
    &:focus::-ms-fill-upper {
        background: #999;
    }
`
