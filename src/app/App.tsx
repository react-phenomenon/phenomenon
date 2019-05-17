import React from 'react'
import { Deck } from '../components/Deck'
import { Slide } from '../components/Slide'
import { Text } from '../components/Text'

export const App = () => {
    return (
        <Deck>
            <Slide index={1}>
                <h1>Slide 1</h1>
                <Text in={1} out={3}>
                    Hello 1
                </Text>
                <Text in={2}>Hello 2</Text>
                <Text in={3}>Hello 3</Text>
                <Text in={2}>Hello 2'</Text>
            </Slide>
            <Slide index={2}>
                <h1>Slide 2</h1>
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
