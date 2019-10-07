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
    SubTitle,
} from '../themes/storm'
import { ConsoleExample } from './ConsoleExample'
import { CssExample } from './CssExample'
import { FullExample } from './FullExample'
import { HowToUse } from './HowToUse'
import { JavaScriptExample } from './JavaScriptExample'
import { ReactExample } from './ReactExample'
import { CodeWithText, CodeInfo } from '../components/CodeWithText'
import { Frag } from '../components/Code'

export const App = () => (
    <Deck config={{ backgroundImage, backgroundColor }}>
        <Slide config={{ backgroundImage: mainBackgroundImage }}>
            <Logo />
            <Text align="center">Click space or use arrow keys to navigate</Text>
        </Slide>
        <Slide>
            <Title>More Code!</Title>
            <CodeWithText
                filename="readme.md"
                code={`
                    // Hello there!
                    // There is more code!
                    $JEJ
                    $JEJ2
                `}
            >
                <Frag id="JEJ" in={1} code="// Jej!" />
                <CodeInfo out={1}>
                    <SubTitle>Code with info here</SubTitle>
                </CodeInfo>
                <CodeInfo in={1} out={2}>
                    <SubTitle>First information</SubTitle>
                    <Text>Consectetur adipisicing elit.</Text>
                </CodeInfo>
                <CodeInfo in={2} out={3}>
                    <SubTitle>Second information</SubTitle>
                    <Text>Adipisicing elit. Beatae!</Text>
                </CodeInfo>
                <CodeInfo in={3}>
                    <SubTitle>Third…</SubTitle>
                    <Text>Even with additional text!</Text>
                </CodeInfo>
                <Frag id="JEJ2" in={3} code="// Jej2!" />
            </CodeWithText>
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
