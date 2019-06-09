import React, { FC, useEffect, useRef } from 'react'
import useMotion from 'react-use/lib/useMotion'
import io from 'socket.io-client'
import styled from 'styled-components'

const socket = io()

const POINTER_SIZE = 30

interface PointerProps {}

export const Pointer: FC<PointerProps> = () => {
    const ref = useRef<HTMLDivElement>(null)

    const { rotationRate } = useMotion()

    useEffect(() => {
        const { gamma, alpha } = rotationRate
        if (gamma && alpha) {
            socket.emit('pointer-move', { x: gamma, y: alpha })
        }
    }, [rotationRate])

    useEffect(() => {
        let lastX = window.innerWidth / 2
        let lastY = window.innerHeight / 2

        const handler = (payload: { x: number; y: number }) => {
            const { x, y } = payload
            const xLimit = window.innerWidth - POINTER_SIZE
            const yLimit = window.innerHeight - POINTER_SIZE

            lastX = limit((lastX + lastX - x) / 2, xLimit, 0)
            lastY = limit((lastY + lastY - y) / 2, yLimit, 0)

            if (ref.current) {
                ref.current.style.display = `block`
                ref.current.style.left = `${lastX}px`
                ref.current.style.top = `${lastY}px`
            }
        }

        socket.on('pointer', handler)
        return () => {
            socket.off('pointer', handler)
        }
    }, [])

    return (
        <Container>
            <Point ref={ref} />
        </Container>
    )
}

const limit = (value: number, min: number, max: number) =>
    Math.max(Math.min(value, min), max)

const Container = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10000;
    overflow: hidden;
    pointer-events: none;
`

const Point = styled.div`
    display: none;
    position: absolute;
    background-color: rgba(255, 0, 0, 0.8);
    width: ${POINTER_SIZE}px;
    height: ${POINTER_SIZE}px;
    border-radius: 100%;
`
