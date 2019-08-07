# Ideas

## Components

```jsx
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

// Code
<Code
    code="
        if ($IF) {
            $BODY
        }
        return null;
    "
>
    <Frag id="IF" in={++i} code="some !== null" inline />
    <Frag
        id="BODY"
        in={++i}
        code="
            const some = { a: 1 };
            return some.toString();
        "
    />
    <Mark in={++i} line={2} />
    <Mark in={++i} id="IF" />
    <Mark in={++i} id="BODY" line={2} />
</Code>


// Stops for PDF, timeline snap and labels
<Stop on={12} label="Very important place" />


// SubSteps unwrap
// Allows you to add something else when eg. showing code fragments
// Consider different name :) noScope, concurrent
<SubSteps unwrap />
<Code unwrap />
<Console unwrap />


// Make react timeline as separate lib
npm install @phenomenon/react-timeline


```
