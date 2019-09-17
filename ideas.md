fiIdeas

## Dev

-   Make react timeline as separate lib

```bash
$ npm install @phenomenon/react-timeline
```

-   Create hooks lib `@phenomenon/hooks` and presentation for that

### Navigation

-   Ctrl+Shift+P for presentation for quick jump
-   On timeline show `<Stop />` and other information
-   Stop component can also "snap" timeline
-   Add mobile swipe gesture to ease navigate on timeline
-   Keep current slide in URL

## Components

### Stop

Stops for PDF, timeline snap and labels

```jsx
<Stop on={12} label="Very important place" />
```

### SubSteps unwrap

Allows you to add something else when eg. showing code fragments
Consider different name :) noScope, concurrent

```jsx
    <SubSteps unwrap />
    <Code unwrap />
    <Console unwrap />
```

### Modal

```jsx
<Modal in={1} out={2}>
    Content
</Modal>
```

### Flow steps

A → B → C

```jsx
<Flow index={x - 1}>
    <FlowStep name="Change" />
    <FlowStep name="Debounce" index={x} />
    <FlowStep name="Calculate" shape="circle" color="hotpink" />
    <FlowStep name="Render" />
</Flow>
```

### Code

-   Add code tabs on to to show what current file we editing
-   Add sidebar

```jsx
    <Code
        header={<CodeTabs tabs={['Button.tsx', 'Buttons.css']} active={1}>}
        sidebar={<CodeSidebar tree={fileStructure} active='Button.tsx' />}
    >
        <Frag … />
    </Code>
```

-   ↑ Icon base on extension? ;)
-   Add split screen like in flutter videos to add more information
-   Add code tabs on to to show what current file we editing, it may be something like this:

```jsx
<Code splited>
    <Info in={1}>
        <Header>Some text</Header>
    </Info>
    <Frag … />
    <Info in={3}>
        <Button disabled />
    </Info>
</Code>
```

-   Markers

```jsx
    <Mark in={++i} line={2} />
    <Mark in={++i} id="IF" />
    <Mark in={++i} id="BODY" line={2} />
```

### Presenter notes

Will be replaced by next automatically by next so you don't need add `out` prop

```jsx
<Note text="This you can put where you want" in={2} />
// …
<Note text="This you can put where you want" in={10} />
```

### Video

It will be grate if video will be synced with timeline!
Pause options also looks promising

```jsx
<Video src={require('./assets/mobile-demo.webm')} pauseAt={['10s', '2min', '-4min']} />
```

### Gallery

Image gallery with zoom

```tsx
<Gallery>
    <GalleryImage src={require('./asset/1.png')} />
    <GalleryImage src={require('./asset/2.png')} zoom={2} />
    <GalleryImage src={require('./asset/3.png')} />
</Galley>
```
