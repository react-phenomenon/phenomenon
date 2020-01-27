# Lighting

The extensible TypeScript animation library.

```
yarn add @phenomenon/lightning

npm install @phenomenon/lightning
```

## Examples

```js
const frames = animate(el('#my-element'), [
    fromTo({ opacity: val(0, 1) }, 400),
    delay(1000),
    fromTo({ opacity: val(1, 0) }, 400),
])

lightning(frames).play()
```

Using `parallel`, `cascade` or `sequence`.

```js
const bodyFrames = animate(el('body'), [
    fromTo({ backgroundColor: color('#FF0000', '#00FF00') }, 1500),
])

const elementFrames = animate(el('#my-element'), [
    delay(500),
    set({ display: ['none', 'block'] }),
    fromTo({ opacity: val(0, 1) }, 500),
])

const anim = parallel([bodyFrames, elementFrames])

const animation = lightning(anim, {
    onComplete() {
        console.log('onComplete')
    },
})

animation.seek(1000)
animation.play()
```
