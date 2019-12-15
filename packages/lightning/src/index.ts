/* eslint-disable no-console */
import { lightning, SerializedItem, Type } from './lightning'
import { val, easeOutElastic } from './helpers'

const serialized: SerializedItem[] = [
    {
        type: Type.Tween,
        offset: 500,
        duration: 2000,
        element: document.getElementById('b')!,
        values: { opacity: val(0.5, 1), paddingTop: val(0, 100, 'px') },
        easing: easeOutElastic,
    },

    {
        offset: 600,
        duration: 0,
        type: Type.Set,
        element: document.getElementById('b')!,
        values: { backgroundColor: ['black', 'navy'] },
    },

    {
        offset: 3000,
        duration: 2000,
        type: Type.Tween,
        element: document.getElementById('b')!,
        values: { opacity: val(1, 0.5), paddingBottom: val(0, 100, 'px') },
        easing: easeOutElastic,
    },

    {
        offset: 500,
        duration: 0,
        type: Type.Set,
        element: document.getElementById('a')!,
        values: { backgroundColor: ['pink', 'hotpink'] },
    },

    {
        offset: 1500,
        duration: 0,
        type: Type.Set,
        element: document.getElementById('a')!,
        values: { color: ['red', 'blue'] },
    },

    {
        offset: 1000,
        duration: 2000,
        type: Type.Tween,
        element: document.getElementById('a')!,
        values: { opacity: val(1, 0.1) },
        easing: easeOutElastic,
    },

    // { offset: 200 + 120, duration: 0, type: Type.Action, action: fn }, // tap()
    // { offset: 200 + 120, duration: 0, type: Type.Pause }, // pause()

    // { offset: 0, duration: animate.duration(), type: Type.Action, action: fn }, // animate callback?

    // {
    //     offset: 100,
    //     duration: 0,
    //     type: Type.Pause,
    // },
]

const anim = lightning(serialized, {
    onComplete() {
        console.log('onComplete')
        anim.play()
    },
    onUpdate(currentTime) {
        seekEl.value = currentTime.toString()
    },
})

// anim.prepare()
// anim.play()

const seekEl = document.getElementById('seek') as HTMLInputElement

seekEl.addEventListener(
    'input',
    event => {
        // @ts-ignore
        const value = +event.target!.value
        anim.seek(value)
    },
    false,
)

document.getElementById('play')!.addEventListener('click', () => {
    anim.play()
})

document.getElementById('pause')!.addEventListener('click', () => {
    anim.pause()
})

document.getElementById('reset')!.addEventListener('click', () => {
    anim.pause()
    anim.seek(0)
})
