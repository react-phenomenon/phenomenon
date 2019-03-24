import React, { useState } from 'react'

type TestProps = {
    addStep: any
    end: any
}

export const Test = (props: TestProps) => {
    const [a, setA] = useState(Math.random())
    return (
        <div>
            <h2>TEST {a}</h2>
            <button onClick={() => setA(Math.random())}>xxx</button>
            {props.addStep(1)}
            {[5, 6, 7].map(i => (
                <div key={i}>{props.addStep(i)}</div>
            ))}
            {props.addStep(10)}
            {props.end()}
        </div>
    )
}
