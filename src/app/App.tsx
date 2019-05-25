import React from 'react'
import { Code, Frag, Comment } from '../components/Code'
import { Deck } from '../components/Deck'
import { Slide } from '../components/Slide'
import { Text } from '../components/Text'
import { Intro } from './Intro'

export const App = () => {
    let s = 0
    let i = 0
    let c = 0

    return (
        <Deck>
            <Slide index={++s}>
                <Intro in={1} />
            </Slide>
            <Slide index={++s}>
                <h1>Slide 1</h1>
                <Text in={++c} out={3}>
                    Hello!
                </Text>
                <Text in={++c} out={3}>
                    I will show you some code examples
                </Text>
                <Code
                    code={`
                        if ($IF) {
                            $IN_IF
                        }

                        $COMMENT
                        console.log($LOG);
                        $END2
                        $END
                    `}
                    in={++c}
                    out={3}
                >
                    <Frag id="IF" in={++i} code="someIs === false" inline />
                    <Frag
                        id="IN_IF"
                        in={++i}
                        indent={1}
                        code={`
                            if(!then) {
                                return null;
                            }
                            
                            return some.toString();
                        `}
                    />
                    <Frag id="COMMENT" in={++i} code={<Comment>Some 💩</Comment>} />
                    <Frag id="END" in={++i} out={++i} code="return true;" />
                    <Frag id="END2" in={i} code="return false;" />
                    <Frag id="LOG" in={++i} code="null >= 0" inline />
                </Code>
                <Text in={++c}>And now some CSS</Text>
                <Code
                    code={`
                        $BODY
                        .button {
                            $BTN
                            $HOVER
                        }
                    `}
                    in={++c}
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
                                font-size: 16px;
                                line-height: 1.6;
                                background-color: #282c34;
                                color: aliceblue;
                                font-family: 'Source Code Pro';
                            }
                        `}
                    />
                </Code>
            </Slide>
            <Slide index={++s}>
                <h1>Slide 2</h1>
                <Text in={1} out={3}>
                    Hello 1
                </Text>
                <Text in={2}>Hello 2</Text>
                <Text in={3}>Hello 3</Text>
                <Text in={2}>Hello 2'</Text>
                <Text in={3}>Hello 3</Text>
                <Text in={2}>Hello 2</Text>
                <Text in={1}>Hello 1</Text>
            </Slide>
            <Slide index={++s}>
                <h1>Slide 3</h1>
                <Text in={1}>Bye ;)</Text>
            </Slide>
        </Deck>
    )
}
