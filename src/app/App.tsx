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

export const App = () => {
    let s = 0

    return (
        <Deck config={{ backgroundImage, backgroundColor }}>
            <Slide index={++s} config={{ backgroundImage: mainBackgroundImage }}>
                <Fade in={1}>
                    <Logo />
                </Fade>
            </Slide>
            <Slide index={++s}>
                <Intro />
            </Slide>
            <Slide index={++s} config={{ backgroundColor, backgroundImage: "''" }}>
                <FullExample />
            </Slide>
            <Slide index={++s}>
                <ConsoleExample />
            </Slide>
            <Slide index={++s}>
                <JavaScriptExample />
            </Slide>
            <Slide index={++s}>
                <ReactExample />
            </Slide>
            <Slide index={++s}>
                <CssExample />
            </Slide>
        </Deck>
    )
}
