import { Code, Comment, Frag } from '@phenomenon/slides'
import { Title } from '@phenomenon/theme-storm'
import React, { FC } from 'react'

export const JavaScriptExample: FC = () => {
    let i = 0
    let h = 100

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
                    hlIn={++h}
                    hlOut={++h}
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
                <Frag id="THEN" in={++i} code="!then" hlIn={++h} hlOut={++h} inline />
                <Frag
                    id="RETURN"
                    in={++i}
                    code="return null;"
                    hlIn={1000}
                    hlOut={1001}
                    indent={2}
                />
                <Frag id="COMMENT" in={++i} code={<Comment>Comment here</Comment>} />
                <Frag id="END" in={++i} out={++i} code="return true;" />
                <Frag id="END2" in={i} code="return false;" hlIn={1000} hlOut={1001} />
                <Frag id="LOG" in={++i} code="null >= 0" inline />
            </Code>
        </>
    )
}
