import React, { FC } from 'react'
import { Title, Text } from '../themes/storm'
import { Fade } from '../components/Fade'
import { Code, Frag, Comment, Mark } from '../components/Code'

export const JavaScriptExample: FC = () => {
    let c = 0
    let i = 0

    return (
        <>
            <Title>JavaScript</Title>
            <Fade in={++c} out={100}>
                <Text>Hello!</Text>
                <Text>I will show you some code examples</Text>
            </Fade>
            <Code
                code={`
                    $FULL_IF

                    $COMMENT
                    console.log($LOG);
                    $END2

                    $END
                `}
                in={++c}
                out={100}
            >
                <Frag
                    id="FULL_IF"
                    in={++i}
                    code={`
                        if ($IF2$IF) {
                            $IN_IF
                        }
                    `}
                />
                <Frag id="IF" in={++i} out={i + 1} code="!disabled || b === 5" inline />
                <Frag id="IF2" in={++i} code="b === 1000" inline />
                <Frag
                    id="IN_IF"
                    in={++i}
                    indent={1}
                    code={`
                        if ($THEN) {
                            $RETURN
                        }
                        
                        return some.startWith('test');
                    `}
                />
                <Frag id="THEN" in={++i} code="!then" inline />
                <Frag id="RETURN" in={++i} code="return null;" indent={2} />
                <Frag id="COMMENT" in={++i} code={<Comment>Comment here</Comment>} />
                <Frag id="END" in={++i} out={++i} code="return true;" />
                <Frag id="END2" in={i} code="return false;" />
                <Mark in={++i} out={i + 2} line={3} />
                <Mark in={++i} out={i + 1} line={10} />
                <Frag id="LOG" in={++i} code="null >= 0" inline />
            </Code>
        </>
    )
}
