import React, { useRef, useEffect } from 'react'
import { Deck } from '../components/Deck'
import { Slide } from '../components/Slide'
import {
    backgroundColor,
    backgroundImage,
    Logo,
    mainBackgroundImage,
    Text,
    SubTitle,
} from '../themes/storm'
import { ConsoleExample } from './ConsoleExample'
import { CssExample } from './CssExample'
import { FullExample } from './FullExample'
import { HowToUse } from './HowToUse'
import { JavaScriptExample } from './JavaScriptExample'
import { ReactExample } from './ReactExample'
import { Fade } from '../components/Fade'

export const App = () => (
    <Deck config={{ backgroundImage, backgroundColor }}>
        <Slide config={{ backgroundImage: mainBackgroundImage }}>
            <Logo />
            <Text align="center">Click space or use arrow keys to navigate</Text>
        </Slide>
        <Slide>
            <SubTitle>Fade component</SubTitle>
            <Fade in={1}>
                <Text align="center">Click space or use arrow keys to navigate</Text>
            </Fade>
        </Slide>
        {/* <Slide>
            <HowToUse />
        </Slide> */}
        {/* <Slide config={{ backgroundColor, backgroundImage: "''" }}> 
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
        </Slide> */}
    </Deck>
)
