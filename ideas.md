# Ideas

## Components

```jsx
// Highlight and show info text
<Info for={['IN_IF', 'RETURN']} info="This works well!" index={x} />

// Show side eg. preview
<Side index={x} end={x+4}>
    <MyComponent />
</Side>

// Flow chart eg. a → b → c
<Flow index={x-1}>
    <FlowStep name="Change" />
    <FlowStep name="Debounce" index={x} />
    <FlowStep name="Calculate" />
    <FlowStep name="Render" />
</Flow>

// Console
<Console prompt="➜ Projects/oak git:(master) ">
    <ConsoleCmd name="pwd" />
    <ConsoleOutput string="/home/Kacper/Projects/oak" />
    <ConsoleCmd name="rm -rf ./" />
    <ConsoleOutput string="" />
</Console>
```

## Presentation global state

```ts
interface State {
    timeStamp: number // Current position
    step: number // One click timeStamp += step
    isAutoPlay: boolean // Components should play entire animation when timeStamp >= start, because one click will change timeStamp by entire step this will be false when seeking or rendering frame by frame
    isPreFlight: boolean // When doing pre-render of entire presentation and finding end
    pages: {
        title?: string
        totalTime: number
    }[]
}

interface Timeline {
    // Register
    addStep(
        index: number,
        duration: number,
        type?: string,
    ): { id: StepID; shouldStart: boolean }
    shouldStart(id: StepID): boolean
    theEnd()
    // Control
    nextStep()
    seek(timeStamp: number)
}
```

## Components structure

```jsx
// App.jsx
<Slides>
    <Slide name="intro">
        <Intro />
    </Slide>
    <Slide name="examples">
        <Examples />
    </Slide>
    <Slide name="the-end">
        <TheEnd />
    </Slide>
</Slides>
```

```jsx
// Examples.jsx
<Code
    code="
        if ($IF) {$BODY}
        return null;
    "
>
    <Frag id="IF" index={++i} code="some !== null" />
    <Frag
        id="BODY"
        index={++i}
        code="
            return some.toString();
        "
    />
    <End index={++i} />
</Code>
```

```js
[1] → Slide in
[1, 1] → Code in
[1, 1, 1] → Frag in
[1, 1, -1] → Frag out
[1, 1, 2] → Frag in
[1, 1, 3] → Frag in
[1, -1] → Code out
[-1] → Slide out

[2] → Slide in
[-2] → Slide out

[3] → Slide in
[-3] → Slide out
```
