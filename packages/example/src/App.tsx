import { fromTo, transform, val } from '@phenomenon/lightning'
import { Animate, Deck, Slide } from '@phenomenon/slides'
import {
    backgroundColor,
    backgroundImage,
    Logo,
    mainBackgroundImage,
    Text,
    Title,
} from '@phenomenon/theme-storm'
import React from 'react'
import { ConsoleExample } from './ConsoleExample'
import { CssExample } from './CssExample'
import { HowToUse } from './HowToUse'
import { JavaScriptExample } from './JavaScriptExample'
import { ReactExample } from './ReactExample'

export const App = () => (
    <Deck config={{ backgroundImage, backgroundColor }}>
        <Slide config={{ backgroundImage: mainBackgroundImage }}>
            <Logo />
            <Text align="center">Click space or use arrow keys to navigate</Text>
        </Slide>
        <Slide>
            <HowToUse />
        </Slide>
        <Slide>
            <Title>More examples</Title>
        </Slide>
        <Slide>
            <ConsoleExample />
        </Slide>
        <Slide>
            <JavaScriptExample />
        </Slide>
        <Slide>
            <ReactExample />
        </Slide>
        <Slide>
            <CssExample />
        </Slide>
        <Slide>
            <Text align="center">Presentation powered by</Text>
            <Animate
                in={1}
                out={2}
                anim={[
                    fromTo(
                        {
                            opacity: val(0, 1),
                            transform: transform({
                                scale: val(0.7, 1),
                                rotate: val(0, 5, 'deg'),
                            }),
                        },
                        1000,
                    ),
                ]}
                exitAnim={[
                    fromTo(
                        {
                            opacity: val(1, 0),
                            transform: transform({
                                scale: val(1, 0.1),
                                rotate: val(5, 100, 'deg'),
                            }),
                        },
                        1000,
                    ),
                ]}
            >
                <Logo />
            </Animate>
        </Slide>
    </Deck>
)
