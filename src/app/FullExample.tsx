import React, { FC } from 'react'
import { Code, Frag } from '../components/Code'
import { Title } from '../themes/storm'

export const FullExample: FC = () => {
    let i = 0
    return (
        <>
            <Title>Full example</Title>
            <Code
                filename="App.jsx"
                code={`
                    <Deck>
                        $SLIDE1
                        $SLIDE2
                    </Deck>
                `}
            >
                <Frag
                    in={++i}
                    id="SLIDE1"
                    indent={1}
                    code={`
                        <Slide>
                            $SLIDE1_CONTENT1
                            $SLIDE1_CONTENT2
                        </Slide>
                    `}
                />
                <Frag
                    in={++i}
                    id="SLIDE1_CONTENT1"
                    indent={2}
                    code={`
                        <h1>Welcome!</h1>
                    `}
                />
                <Frag
                    in={++i}
                    id="SLIDE1_CONTENT2"
                    indent={2}
                    code={`
                        <Fade in={1}>
                            <p>Lorem ipsum dor…</p>
                        </Fade>
                    `}
                />
                <Frag
                    in={++i}
                    id="SLIDE2"
                    indent={1}
                    code={`
                        <Slide>
                            $SLIDE2_CONTENT
                        </Slide>
                    `}
                />
                <Frag
                    in={++i}
                    id="SLIDE2_CONTENT"
                    indent={2}
                    code={`
                        <h1>Next slide!</h1>
                        <Expand in={1}>
                            <h2>hooray!</h2>
                        </Expand>
                        <p>It's so easy!</p>
                    `}
                />
            </Code>
        </>
    )
}
