/* eslint-disable no-console */
import { easeOutElastic, val } from './helpers'
import { lightning } from './lightning'
import { animation } from './timeline/animation'
import { fromTo, set, delay } from './timeline/operators'
import { timeline } from './timeline/timeline'

const animationA = animation('#a', [
    fromTo(
        {
            opacity: val(0.5, 1),
            paddingTop: val(0, 100, 'px'),
        },
        2000,
        easeOutElastic,
    ),
    set({
        backgroundColor: ['black', 'navy'],
    }),
    delay(1000),
    fromTo(
        {
            opacity: val(1, 0.5),
            paddingBottom: val(0, 100, 'px'),
        },
        2000,
    ),
])

const animationB = animation('#b', [
    fromTo(
        {
            opacity: val(0.5, 1),
            paddingBottom: val(0, 100, 'px'),
        },
        2000,
    ),
    set({
        backgroundColor: ['black', 'hotpink'],
    }),
    fromTo(
        {
            opacity: val(1, 0.5),
            paddingTop: val(0, 100, 'px'),
        },
        2000,
        easeOutElastic,
    ),
])

const animationC1 = animation('#c', [fromTo({ opacity: val(0, 1) }, 1000)])
const animationC2 = animation('#c', [fromTo({ opacity: val(1, 0) }, 1000)])

const serialized = timeline(
    [
        animationC1,
        timeline([animationA, animationB], {
            type: 'parallel',
        }),
        animationC2,
    ],
    { type: 'sequence' },
)

console.log('serialized', serialized)

const anim = lightning(serialized, {
    onComplete() {
        console.log('onComplete')
        anim.play()
    },
    onUpdate(currentTime) {
        seekEl.value = currentTime.toString()
    },
})

setTimeout(() => {
    anim.prepare()
}, 400)

setTimeout(() => {
    anim.play()
}, 800)

const seekEl = document.getElementById('seek') as HTMLInputElement

seekEl.setAttribute('max', anim.total.toString())

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
