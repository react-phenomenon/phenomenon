import React from 'react'
import { Code, Frag, Comment } from '../components/Code'
import { Deck } from '../components/Deck'
import { Slide } from '../components/Slide'
import { Text } from '../components/Text'

export const App = () => {
    let i = 1

    return (
        <Deck>
            <Slide index={1}>
                <h1>Slide 1</h1>
                <Code
                    code={`
                        if ($IF) {
                            $IN_IF
                        }

                        $COMMENT
                        $END2
                        $END
                    `}
                    index={++i}
                >
                    <Frag id="IF" index={++i} code="someIs === false" inline />
                    <Frag
                        id="IN_IF"
                        index={++i}
                        code={`
                            if(!then) {
                                return null;
                            }
                            
                            return some.toString();
                        `}
                    />
                    <Frag id="COMMENT" index={++i} code={<Comment>Some 💩</Comment>} />
                    <Frag id="END" index={++i} code="return true;" />
                    <Frag id="END2" index={++i} code="return kupa;" />
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
            </Slide>
        </Deck>
    )
}
