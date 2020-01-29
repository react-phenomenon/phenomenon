# Lighting

The extensible TypeScript animation library.

```
yarn add @phenomenon/lightning

npm install @phenomenon/lightning
```

## Examples

```js
import { lightning, animate, fromTo, delay, val } from '@phenomenon/lightning'

const frames = animate('#my-element', [
    fromTo({ opacity: val(0, 1) }, 400),
    delay(1000),
    fromTo({ opacity: val(1, 0) }, 400),
])

lightning(frames).play()
```

Using `parallel`, `cascade` or `sequence`.

```js
import {
    lightning,
    animate,
    parallel,
    fromTo,
    delay,
    set,
    val,
    color,
    transform,
} from '@phenomenon/lightning'

const bodyFrames = animate('body', [
    fromTo({ backgroundColor: color('#FF0000', '#00FF00') }, 1500),
])

const elementFrames = animate('#my-element', [
    delay(500),
    set({ display: ['none', 'block'] }),
    fromTo(
        {
            opacity: val(0, 1),
            transform: transform({
                y: val(-200, 0, 'px'),
                scale: val(0.9, 1),
                rotate: val(10, 0, 'deg'),
            }),
        },
        500,
    ),
])

const frames = parallel([bodyFrames, elementFrames])

const animation = lightning(frames, {
    onComplete() {
        console.log('onComplete')
        animation.play() // loop
    },
})

animation.seek(500)
animation.play()
```
