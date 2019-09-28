import React, { FC } from 'react'
import { Code } from '../components/Code'
import { Expand } from '../components/Expand'
import { Fade } from '../components/Fade'
import { SubTitle, Text, Title } from '../themes/storm'

export const HowToUse: FC = () => {
    let f = 0
    return (
        <div>
            <Title>How to use</Title>
            <Expand in={++f} out={f + 1}>
                <Text>To create slides you have to use two components:</Text>
                <Code
                    code={`
                        <Deck>
                            <Slide>Slide 1 content</Slide>
                            <Slide>Slide 2 content</Slide>
                            // …
                        </Deck>
                    `}
                />
            </Expand>
            <Expand in={++f}>
                <Text>Next, you may want to add some fancy components like:</Text>
            </Expand>
            <Fade in={++f}>
                <SubTitle>Fade component</SubTitle>
                <Code code={`<Fade in={1}>Content</Fade>`} />
            </Fade>
            <Expand in={++f}>
                <SubTitle>Expand component</SubTitle>
                <Code code={`<Expand in={2}>Content</Expand>`} />
            </Expand>
        </div>
    )
}
