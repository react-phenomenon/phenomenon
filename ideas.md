# Ideas

## Name

PoAK → Presentation of Amazing Knowledge

## Components

```jsx
    // Highlight and show info text
    <Info for={['IN_IF', 'RETURN']} info="This works well!" index={x} />

    // Show side eg. preview
    <Slide index={x} end={x+4}>
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
    currentPage: 'Example';
    pages: ['Intro', 'Example', 'End'],
    currentStep: 3,
    steps: 5,
}
```
