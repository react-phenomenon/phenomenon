import React, { FC } from 'react'
import { Code, Frag } from '../components/Code'

export const FullExample: FC = () => {
    let i = 0
    return (
        <Code
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
                    <Slide index={1}>
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
                    <Fade in={1}>
                        <h1>Welcome!</h1>
                    </Fade>
                `}
            />
            <Frag
                in={++i}
                id="SLIDE1_CONTENT2"
                indent={2}
                code={`
                    <Fade in={2}>
                        <p>Lorem ipsum dor…</p>
                    </Fade>
                `}
            />
            <Frag
                in={++i}
                id="SLIDE2"
                indent={1}
                code={`
                    <Slide index={2}>
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
    )
}
