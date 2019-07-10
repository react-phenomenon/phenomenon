import React from 'react'
import { Code, Comment, Frag } from '../components/Code'
import { Deck } from '../components/Deck'
import { Fade } from '../components/Fade'
import { Slide } from '../components/Slide'
import {
    backgroundColor,
    backgroundImage,
    Logo,
    mainBackgroundImage,
    Text,
    Title,
} from '../themes/storm'
import { ConsoleExample } from './ConsoleExample'
import { FullExample } from './FullExample'
import { Intro } from './Intro'

export const App = () => {
    let s = 0
    let i = 0
    let c = 0

    return (
        <Deck config={{ backgroundImage, backgroundColor }}>
            <Slide index={++s} config={{ backgroundImage: mainBackgroundImage }}>
                <Fade in={1}>
                    <Logo />
                </Fade>
            </Slide>
            <Slide index={++s}>
                <Intro></Intro>
            </Slide>
            <Slide index={++s} config={{ backgroundColor, backgroundImage: "''" }}>
                <Title>Full example</Title>
                <FullExample />
            </Slide>
            <Slide index={++s}>
                <Title>Console</Title>
                <ConsoleExample />
            </Slide>
            <Slide index={++s}>
                <Title>JavaScript</Title>
                <Fade in={++c} out={3}>
                    <Text>Hello!</Text>
                    <Text>I will show you some code examples</Text>
                </Fade>
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
                <Title>React</Title>
                <Code
                    in={1}
                    code={`
                        $DIV_START $LABEL
                        $____<input$TYPE$ID />
                        $DIV_END
                    `}
                >
                    <Frag id="TYPE" in={1} code={` type="email"`} inline />
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
                    <Frag id="FOR" in={4} code={` for="email"`} inline />
                    <Frag id="ID" in={4} code={` id="email"`} inline />
                </Code>
            </Slide>
            <Slide index={++s}>
                <Title>CSS</Title>
                <Fade in={++c}>
                    <Text>And now some CSS</Text>
                </Fade>
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
        </Deck>
    )
}
