# Lightning

Animation library

## Example

```ts
const first = animate('.test', [
    fromTo({ opacity: [0, 1] }, { duration: 200 }),
    delay(100),
    set({ display: ['inline', 'block'] }),
    tap(() => console.log('here!')),
    to({ opacity: 0 }, { duration: 200 }),
])

const animation = timeline([first, pause(), first])

animation.play()
```

## Composition

```ts
const a = animate('#a', […])
const b = animate('#b', […])
const c = animate('#c', […])

timeline(
    [a, b],
    c,
)

timeline(
    atSameTime([a, b], { align: 'center' }),
    c,
)

timeline(
    timeline([a,b], {type: "sequence"}),
    c
)
```

## Interfaces

```ts
// opacity, display…
interface Params {}

// fromTo, delay, set?
interface Tween {
    fromParams: Params
    toParams: Params
    options: { duration: number }
    getCssValueAt(relativeTime: number): CSSValues
}

interface SerializedTween {
    tween: Tween
    offset: number
    duration: number
}

// animation(), timeline() and pause()
interface Playable {
    totalTime: number
    paused: boolean
    play(): void
    pause(): void
    seek(n: number): void

    serialize(offset: number): SerializedTween[]
}

// animate()
interface Animation extends Playable {
    element: DomNode | string
    tweens: Tween[]
}

// timeline()
interface Timeline extends Playable {
    animations: Playable[]
    options: { type: 'sequence' | 'parallel' | 'cascade' }
}
```

## Serialized

```ts
enum Type {
    Tween,
    Set,
    Action,
    Pause,
}

const serialized = [
    { offset: 0, duration: animate.duration(), type: Type.Action, action: fn }, // animate callback?

    {
        offset: 0,
        type: Type.Tween,
        duration: 200,
        tween: fn,
        element: el,
        values: { opacity: [0, 1] }
    }, // tween()

    { offset: 200, duration: 100, type: Type.Tween, tween: fn, element: el, values: { ... } },
    { offset: 200, duration: 120, type: Type.Tween, tween: fn, element: el2, values: { ... } },


    { offset: 200 + 120, duration: 0, type: Type.Set, element: el, values: { ... } }, // set()

    { offset: 200 + 120, duration: 0, type: Type.Action, action: fn }, // tap()
    { offset: 200 + 120, duration: 0, type: Type.Pause }, // pause()
]
```
