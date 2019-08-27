import React from 'react'
import { Deck } from '../components/Deck'
import { Fade } from '../components/Fade'
import { Slide } from '../components/Slide'
import {
    backgroundColor,
    backgroundImage,
    Logo,
    mainBackgroundImage,
    SubTitle,
    Text,
} from '../themes/storm'

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
