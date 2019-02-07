import React from 'react'
import { Code, Comment, Frag } from '../../components/Code'

export const Slides = () => (
    <div>
        <Code
            code="
                if ($IF) {
                    $RETURN_NULL $COMMENT
                }

                $END
            "
        >
            <Frag id="IF" code="dupa === false" index={1} />
            <Frag id="RETURN_NULL" code="return null;" index={2} />
            <Frag id="COMMENT" code={<Comment>Some 💩</Comment>} index={3} />
            <Frag id="END" code="return true;" index={4} />
        </Code>
    </div>
)
