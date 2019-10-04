import React from 'react'
import { Animate } from '../components/Animate'
import { Deck } from '../components/Deck'
import { Slide } from '../components/Slide'
import {
    backgroundColor,
    backgroundImage,
    Logo,
    mainBackgroundImage,
    Text,
    Title,
} from '../themes/storm'
import { ConsoleExample } from './ConsoleExample'
import { CssExample } from './CssExample'
import { FullExample } from './FullExample'
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
        <Slide config={{ backgroundColor, backgroundImage: "''" }}>
            <FullExample />
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
                from={{ opacity: 0, scale: 0.9, rotation: 10 }}
                to={{ opacity: 1, scale: 1, rotation: 0 }}
            >
                <Logo />
            </Animate>
        </Slide>
    </Deck>
)
