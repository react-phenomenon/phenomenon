import { Code, Fade, Frag } from '@phenomenon/slides'
import { Text, Title } from '@phenomenon/theme-storm'
import React, { FC } from 'react'

export const CssExample: FC = () => {
    let c = 0
    let i = 0
    return (
        <>
            <Title>CSS</Title>
            <Fade in={++c}>
                <Text>And now some CSS</Text>
            </Fade>
            <Code
                filename="styles/global.css"
                code={`
                        $BODY
                        .button {
                            $BTN
                            $HOVER
                        }
                    `}
                start={++c}
            >
                <Frag
                    id="BTN"
                    in={++i}
                    code={`
                        background: red;
                    `}
                    indent={1}
                />
                <Frag
                    id="HOVER"
                    in={++i}
                    code={`
                        &:hover {
                            background: #abc123;
                        }
                    `}
                    indent={1}
                />
                <Frag
                    id="BODY"
                    in={++i}
                    code={`
                        body {
                            box-sizing: border-box;
                            height: 100%;
                            margin: 0;
                            padding: 10px;
                            $BODY2
                        }
                        
                    `}
                />
                <Frag
                    id="BODY2"
                    in={++i}
                    indent={1}
                    code={`
                        line-height: 1.6;
                        background-color: #923abc;
                        color: aliceblue;
                        font-family: 'Source Code Pro';
                    `}
                />
            </Code>
        </>
    )
}
