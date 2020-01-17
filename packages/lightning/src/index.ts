/* eslint-disable no-console */
import { easeOutElastic } from './helpers'
import { lightning } from './lightning'
import { animation } from './timeline/animation'
import { fromTo, set, delay } from './timeline/operators'
import { timeline } from './timeline/timeline'
import { val } from './values/val'
import { color } from './values/color'
import { transform } from './values/transform'

const animationA = animation('#a', [
    fromTo(
        {
            opacity: val(0.5, 1),
            paddingTop: val(0, 100, 'px'),
            color: color('#ABC123', '#FF0000'),
            transform: transform({
                y: val(-1000, 0, 'px'),
                scale: val(0, 1),
                rotate: val(50, 0, 'deg'),
                skewY: val(50, 0, 'deg'),
            }),
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
        textAlign: ['left', 'center'],
    }),
    fromTo(
        {
            opacity: val(1, 0.5),
            paddingTop: val(0, 100, 'px'),
            backgroundColor: color('#ABC123', '#FF0000'),
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
