import React, { useEffect, FC, useContext, useRef } from 'react'
import { TimelineContext } from '../../lib/Timeline'
import { SubSteps } from '../SubSteps'
import styled from 'styled-components'

export const Slide: FC<{ index: number }> = props => {
    const timeline = useContext(TimelineContext)
    const ref = useRef(null)

    useEffect(() => {
        timeline.addStep([props.index], () => {
            return {
                targets: ref.current,
                easing: 'easeInOutQuad',
                opacity: [0, 1],
                translateX: [250, 0],
            }
        })
        // timeline.addStep([-props.index, 0], () => {
        //     return {
        //         targets: ref.current,
        //         easing: 'easeInOutQuad',
        //         opacity: [1, 0],
        //         translateX: -250,
        //     }
        // })
    }, [])

    return (
        <SubSteps id={[props.index]}>
            <Wrapper>
                <Content ref={ref}>
                    <div>{props.children}</div>
                </Content>
            </Wrapper>
        </SubSteps>
    )
}

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;
`

const Content = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
`
