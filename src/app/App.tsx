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
import { Intro } from './Intro'
import { JavaScriptExample } from './JavaScriptExample'
import { ReactExample } from './ReactExample'
import { CssExample } from './CssExample'

export const App = () => (
    <Deck config={{ backgroundImage, backgroundColor }}>
        <Slide config={{ backgroundImage: mainBackgroundImage }}>
            <Fade in={1}>
                <Logo />
            </Fade>
        </Slide>
        <Slide>
            <Intro />
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
