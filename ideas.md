# Ideas

## Name

PoAK → Presentation of Amazing Knowledge

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
```

## Presentation state

```js
const state = {
    pages: ['Intro', 'Example', 'End'],
    currentPage: 'Example',
    currentStep: 3,
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
