import React, { createRef, FC, useEffect, useState } from 'react'
import useLocalStorage from 'react-use/lib/useLocalStorage'
import styled from 'styled-components'
import { useKeyPress } from '../../hooks/useKeyPress'
import { Timeline } from '../../lib/Timeline'

interface ControlsProps {
    timeline: Timeline
}

export const Controls: FC<ControlsProps> = props => {
    const { timeline } = props
    const inputRef = createRef<HTMLInputElement>()
    const [help, toggleHelp] = useLocalStorage('help', false)

    useEffect(() => {
        const ref = inputRef.current
        if (ref) {
            timeline.onUpdate((ms, duration) => {
                ref.value = ((ms / duration) * 100).toString()
            })
        }
    }, [])

    const nextPress = useKeyPress(' ', 'ArrowRight', 'd')
    const prevPress = useKeyPress('Backspace', 'ArrowLeft', 'a')
    const helpPress = useKeyPress('h')
    const homePress = useKeyPress('Home', 's')

    const next = () => timeline.next()
    const back = () => timeline.back()

    useEffect(() => {
        if (nextPress) next()
        if (prevPress) back()
        if (helpPress) toggleHelp(!help)
        if (homePress) timeline.seek(0)
    }, [nextPress, prevPress, helpPress, homePress])

    const handleRangeEnd = (event: any) => {
        event.preventDefault()
        event.target.blur()
        timeline.next()
    }

    return (
        <>
            <Container>
                <Line
                    ref={inputRef}
                    type="range"
                    defaultValue="0"
                    step="0.1"
                    onMouseUp={handleRangeEnd}
                    onTouchEnd={handleRangeEnd}
                    onChange={e => timeline.seekByPercent(+e.target.value / 100)}
                />
                {help && (
                    <Steps
                        style={{
                            position: 'absolute',
                            right: 10,
                            bottom: 40,
                            textAlign: 'left',
                        }}
                    >
                        {timeline.steps.map((step, i) => (
                            <li key={step.id.toString() + i}>
                                {step.id.join('.')}
                                {step.options &&
                                    step.options.title &&
                                    ` - ${step.options.title}`}
                            </li>
                        ))}
                    </Steps>
                )}
            </Container>
            <ClickableArea left onClick={back} />
            <ClickableArea right onClick={next} />
        </>
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

const ClickableArea = styled.div<{ left?: boolean; right?: boolean }>`
    position: fixed;
    top: 0;
    bottom: 0;
    width: 40vw;
    height: 100%;
    z-index: 9;
    ${p => p.left && 'left: 0;'}
    ${p => p.right && 'right: 0;'}
`

const Steps = styled.ol`
    font-size: 12px;
    max-height: 80vh;
    overflow: auto;
`

const Line = styled.input`
    width: 100%;
    opacity: 0.5;
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
