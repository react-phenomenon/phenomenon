import React from 'react'
import { Code, Frag } from '../components/Code'
import { Deck } from '../components/Deck'
import { Fade } from '../components/Fade'
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
import { FullExample } from './FullExample'
import { HowToUse } from './HowToUse'
import { JavaScriptExample } from './JavaScriptExample'
import { ReactExample } from './ReactExample'
import { CssExample } from './CssExample'

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
    </Deck>
)
