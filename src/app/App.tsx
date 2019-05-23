import React from 'react'
import { Code, Frag, Comment } from '../components/Code'
import { Deck } from '../components/Deck'
import { Slide } from '../components/Slide'
import { Text } from '../components/Text'

export const App = () => {
    let i = 0
    let c = 0

    return (
        <Deck>
            <Slide index={1}>
                <h1>Slide 1</h1>
                <Text in={++c} out={3}>Hello!</Text>
                <Text in={++c} out={3}>I will show you some code examples</Text>
                <Code
                    code={`
                        if ($IF) {
                            $IN_IF
                        }

                        $COMMENT
                        console.log($LOG);
                        $END
                    `}
                    in={++c}
                    out={3}
                >
                    <Frag id="IF" index={++i} code="someIs === false" inline />
                    <Frag
                        id="IN_IF"
                        index={++i}
                        indent={1}
                        code={`
                            if(!then) {
                                return null;
                            }
                            
                            return some.toString();
                        `}
                    />
                    <Frag id="COMMENT" index={++i} code={<Comment>Some 💩</Comment>} />
                    <Frag id="END" index={++i} code="return true;" />
                    <Frag id="LOG" index={++i} code="null >= 0" inline />
                </Code>
                <Text in={++c}>And now some CSS</Text>
                <Code
                    code={`
                        .button {
                            $BTN
                            $HOVER
                        }
                    `}
                    in={++c}
                >
                    <Frag
                        id="BTN"
                        index={++i}
                        code={`
                            background: red;
                        `}
                        indent={1}
                    />
                    <Frag
                        id="HOVER"
                        index={++i}
                        code={`
                            &:hover {
                                background: #abc123;
                            }
                        `}
                        indent={1}
                    />
                </Code>
            </Slide>
            <Slide index={2}>
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
            <Slide index={3}>
                <h1>Slide 3</h1>
                <Text in={1}>
                    Bye ;)
                </Text>
            </Slide>
        </Deck>
    )
}
