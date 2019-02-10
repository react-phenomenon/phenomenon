import React from 'react'
import { Code, Comment } from '../components/Code'
import { Frag } from '../components/Frag'
import { End } from '../components/End'

export const Examples = () => {
    let i = 0
    return (
        <div>
            <Code
                code="
                    if ($IF) {
                        $COMMENT
                        $IN_IF
                    }

                    $END2
                    $END
                "
            >
                <Frag id="IF" index={++i} code="someIs === false" />
                <Frag
                    id="IN_IF"
                    index={++i}
                    code="
                        if(!then) {
                            return null;
                        }
                        
                        return some.toString($OPTIONS);
                    "
                />
                <Frag id="COMMENT" index={++i} code={<Comment>Some 💩</Comment>} />
                <Frag id="END" index={++i} code="return true;" />
                <Frag id="END2" index={++i} code="return kupa;" />
            </Code>
            <Code
                code={`
                    .button {$BTN}
                `}
            >
                <Frag
                    id="BTN"
                    index={++i}
                    code="
                        background: red;

                        &:hover {
                            background: #abc123;
                        }
                    "
                    block
                    indent={1}
                />
            </Code>
            <Code
                code={`
                    <Code
                        code="
                            <MainElement>
                                <h1>Hello there!</h1>
                                $ MY_FRAG
                                $ BUTTON
                            </MainElement>
                        "
                    >
                        <Frag id="MY_FRAG" code="Hello React!" />
                        <Frag id="BUTTON" code="
                            <button onClick={() => alert('click')}>
                                Alert!
                            </button>
                        " />
                    </Code>
            `}
            />

            <End step={++i} />
        </div>
    )
}
