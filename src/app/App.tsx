import React from 'react'
import { Code, Frag, Comment } from '../components/Code'
import { Deck } from '../components/Deck'
import { Slide } from '../components/Slide'
import { Text } from '../components/Text'
import { Intro } from './Intro'
import { Console, Cmd, Output } from '../components/Console'

export const App = () => {
    let s = 0
    let i = 0
    let c = 0

    let cli = 0

    return (
        <Deck>
            <Slide index={++s}>
                <Intro in={1} />
            </Slide>
            <Slide index={++s}>
                <h1>CMD</h1>
                <Console in={1}>
                    <Cmd in={++cli} name="rm -rf /dev/null" />
                    <Output
                        in={++cli}
                        text="rm: cannot remove '/dev/null': No such file or directory"
                    />
                    <Cmd in={++cli} name="ls -l /home/root/Projects/oak" />
                    <Output
                        in={++cli}
                        text={`
                            total 568
                            root   4096 maj 28 01:19 build
                            root  36864 cze  5 23:24 node_modules
                            root   1661 cze  5 23:24 package.json
                            root   4096 lut 13 15:36 public
                            root     12 mar 16 13:23 README.md
                        `}
                    />
                    <Output
                        in={++cli}
                        text={`
                            root   4096 cze  3 02:07 scripts
                            root   4096 maj 23 00:40 src
                            root    703 cze  5 23:46 tsconfig.json
                            root 499238 cze  5 23:24 yarn.lock
                        `}
                    />
                </Console>
            </Slide>
            <Slide index={++s}>
                <h1>JavaScript</h1>
                <Text in={++c} out={3}>
                    Hello!
                </Text>
                <Text in={++c} out={3}>
                    I will show you some code examples
                </Text>
                <Code
                    code={`
                        if ($IF2$IF) {
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
                    <Frag
                        id="IF"
                        in={++i}
                        out={i + 1}
                        code="!disabled || b === 5"
                        inline
                    />
                    <Frag id="IF2" in={++i} code="b === 1000" inline />
                    <Frag
                        id="IN_IF"
                        in={++i}
                        indent={1}
                        code={`
                            if($THEN) {$RETURN
                            }
                            
                            return some.startWith('test');
                        `}
                    />
                    <Frag id="THEN" in={++i} code="!then" inline />
                    <Frag id="RETURN" in={++i} code="return null;" indent={2} />
                    <Frag id="COMMENT" in={++i} code={<Comment>Some 💩</Comment>} />
                    <Frag id="END" in={++i} out={++i} code="return true;" />
                    <Frag id="END2" in={i} code="return false;" />
                    <Frag id="LOG" in={++i} code="null >= 0" inline />
                </Code>
            </Slide>
            <Slide index={++s}>
                <h1>React</h1>
                <Code
                    in={1}
                    code={`
                        $DIV_START $LABEL
                        $____<input $TYPE $ID />
                        $DIV_END
                    `}
                >
                    <Frag id="TYPE" in={1} code={`\u00a0type="email"`} inline />
                    <Frag id="DIV_START" in={2} code={`<div className="wrapper">`} />
                    <Frag id="____" in={2} code={`    `} inline />
                    <Frag id="DIV_END" in={2} code={`</div>`} />
                    <Frag
                        id="LABEL"
                        in={3}
                        indent={1}
                        code={`
                            <label$FOR>
                                Email:
                            </label>
                        `}
                    />
                    <Frag id="FOR" in={4} code={`\u00a0for="email"`} inline />
                    <Frag id="ID" in={4} code={`\u00a0id="email"`} inline />
                </Code>
            </Slide>
            <Slide index={++s}>
                <h1>CSS</h1>
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
            </Slide>
            <Slide index={++s}>
                <h1>End</h1>
                <Text in={1} out={2}>
                    1 Bye
                </Text>
                <Text in={2} out={3}>
                    2 Bye ;
                </Text>
                <Text in={3}>3 Bye ;)</Text>
            </Slide>
        </Deck>
    )
}
