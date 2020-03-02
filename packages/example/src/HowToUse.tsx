import { CodeInfo, CodeWithText, Frag, Code } from '@phenomenon/slides'
import { SubTitle, Text, Title } from '@phenomenon/theme-storm'
import React, { FC } from 'react'

export const HowToUse: FC = () => {
    let f = 1
    return (
        <>
            <Title>How to use</Title>
            <CodeWithText
                filename="App.tsx"
                code={`
                    // @TODO presentation
                    $DECK
                `}
            >
                <CodeInfo out={f + 1}>
                    <SubTitle>First</SubTitle>
                    <Text>To create slides you have to use two components</Text>
                </CodeInfo>

                <Frag
                    id="DECK"
                    in={++f}
                    code={`
                        <Deck>
                            $SLIDES
                        </Deck>
                    `}
                />
                <CodeInfo in={f} out={++f}>
                    <SubTitle>{'<Deck>'}</SubTitle>
                    <Text>That&apos;s hold your slides</Text>
                </CodeInfo>

                <Frag
                    id="SLIDES"
                    in={f}
                    indent={1}
                    code={`
                        <Slide>
                            $SIMPLE_CONTENT1$SIMPLE_CONTENT3
                        </Slide>
                        <Slide>
                            $SIMPLE_CONTENT2
                        </Slide>
                    `}
                />
                <CodeInfo in={f} out={++f}>
                    <SubTitle>{'<Slide>'}</SubTitle>
                    <Text>For each slide</Text>
                </CodeInfo>

                <Frag
                    id="SIMPLE_CONTENT1"
                    in={f}
                    out={f + 3}
                    indent={2}
                    code={`
                        <h1>My slide</h1>
                        <p>And my slide content!</p>
                    `}
                />
                <Frag
                    id="SIMPLE_CONTENT2"
                    in={f}
                    indent={2}
                    code={`
                        <h1>OMG next slide!</h1>
                    `}
                />
                <CodeInfo in={f} out={++f}>
                    <Text>Where you can put your content</Text>
                </CodeInfo>

                <CodeInfo in={f} out={++f}>
                    <Text>And you have a little bit boring presentation :)</Text>
                </CodeInfo>

                <CodeInfo in={f} out={f + 2}>
                    <SubTitle>But you can add more stuff</SubTitle>
                    <Text>
                        Like {'<Fade>'}, {'<Fade>'} and more!
                    </Text>
                </CodeInfo>
                <Frag
                    id="SIMPLE_CONTENT3"
                    in={++f}
                    indent={2}
                    code={`
                        <h1>My slide</h1>
                        <Fade in={1}>
                            <p>And my slide content!</p>
                        </Fade>
                        <Expand in={2}>
                            <p>And my second content!</p>
                        </Expand>
                    `}
                />

                <CodeInfo in={++f} out={++f}>
                    <SubTitle>As you can see</SubTitle>
                    <Text>You control order using `in` props</Text>
                </CodeInfo>

                <CodeInfo in={f} out={++f}>
                    <Text>And there is more!</Text>
                </CodeInfo>
            </CodeWithText>
        </>
    )
}
