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
        addStep(props.in, {
            targets: ref.current!.getElementsByTagName('div'),
            translateX: [
                { value: animejs.stagger([-100, 200]) },
                { value: animejs.stagger([-50, 50]) },
            ],
            rotate: [animejs.stagger([-7, 7]), 0],
            duration: 1000,
            easing: 'easeInOutQuint',
        })
        addStep(props.in, {
            targets: refTitle.current,
            scale: [0.9, 1],
            opacity: [0, 1],
            easing: 'easeInOutQuint',
        })
    }, [])

    return (
        <div>
            <div ref={ref}>
                <Square />
                <Square />
                <Square />
                <Square main>
                    <Title ref={refTitle} style={{ opacity: 0 }}>
                        <b>Oak</b> Presentation Library
                    </Title>
                </Square>
                <Square style={{ translate: 'transformX(-100px)' }} />
            </div>
        </div>
    )
}

const Square = styled.div<{ main?: boolean }>`
    width: 300px;
    height: 200px;
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border: 3px solid #282c34;
    background-color: ${p => (p.main ? '#abc123' : 'rgba(255,255,255,.1)')};
    z-index: ${p => (p.main ? 2 : 1)};
`

const Title = styled.p`
    font-size: 30px;
    color: #282c34;
    margin: 0;
    padding: 10px 20px;
    line-height: 1.2;

    b {
        font-size: 70px;
        display: block;
    }
`
