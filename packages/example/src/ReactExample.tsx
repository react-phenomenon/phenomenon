import { Code, Frag } from '@phenomenon/slides'
import { Title } from '@phenomenon/theme-storm'
import React, { FC } from 'react'

export const ReactExample: FC = () => (
    <>
        <Title>React</Title>
        <Code
            filename="Input.tsx"
            scale={1.3}
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
    </>
)
