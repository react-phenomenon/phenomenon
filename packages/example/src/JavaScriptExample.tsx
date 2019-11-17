import { Code, Comment, Frag, Mark } from '@phenomenon/slides'
import { Title } from '@phenomenon/theme-storm'
import React, { FC } from 'react'

export const JavaScriptExample: FC = () => {
    let i = 0

    return (
        <>
            <Title>JavaScript</Title>
            <Code
                filename="some.js"
                code={`
                        $FULL_IF
    
                        $COMMENT
                        console.log($LOG);
                        $END2
    
                        $END
                    `}
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
