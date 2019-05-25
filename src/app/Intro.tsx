import React, { FC, useRef, useEffect } from 'react'
import { useSlides } from '../hooks/useSlides'
import styled from 'styled-components'
import animejs from 'animejs'

interface IntroProps {
    in: number
}

export const Intro: FC<IntroProps> = props => {
    const ref = useRef<HTMLDivElement>(null)
    const refTitle = useRef<HTMLDivElement>(null)
    const { addStep } = useSlides()

    useEffect(() => {
        addStep(props.in, () => ({
            targets: ref.current!.getElementsByTagName('div'),
            translateX: [
                { value: animejs.stagger([-50, 50]) },
                { value: animejs.stagger([-45, 45]) },
                { value: animejs.stagger([-200, 200]) },
            ],
            translateY: [{ value: 0 }, { value: 0 }, { value: 200 }],
            opacity: [1, 1, 1, 0],
            rotate: [
                { value: animejs.stagger([-30, 30]) },
                { value: animejs.stagger([-20, 20]) },
                { value: animejs.stagger([-100, 100]) },
            ],
            duration: 2000,
        }))
        addStep(props.in, () => ({
            targets: refTitle.current,
            scale: [0.9, 1],
            opacity: [0, 1],
        }))
    }, [])

    return (
        <div>
            <div ref={ref}>
                <Square className="sq1" />
                <Square className="sq2" />
                <Square className="sq3" />
                <Square className="sq1" />
                <Square className="sq2" />
                <Square className="sq3" />
            </div>
            <Title ref={refTitle} style={{ opacity: 0 }}>
                <b>Oak</b> <br /> Presentation Library
            </Title>
        </div>
    )
}

const Square = styled.div`
    height: 300px;
    width: 200px;
    border-radius: 10px;
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    transform-origin: 50% 88%;

    &.sq1 {
        background-color: #ff4066;
    }
    &.sq2 {
        background-color: #ffa440;
    }
    &.sq3 {
        background-color: #213ebf;
    }
`

const Title = styled.div`
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 400px;
    height: 4em;
    font-size: 30px;
    text-align: center;

    b {
        color: #76ba3b;
        font-size: 40px;
    }
`
