/* eslint-disable no-console */
import { easeOutElastic } from './helpers'
import { lightning } from './lightning'
import { animate } from './timeline/animate'
import { fromTo, set, delay } from './timeline/operators'
import { sequence, parallel } from './timeline/timeline'
import { val } from './values/val'
import { color } from './values/color'
import { transform } from './values/transform'

const animationA = animate('#a', [
    fromTo(
        {
            paddingTop: val(0, 100, 'px'),
            transform: transform({
                y: val(-300, 0, 'px'),
                scale: val(0.9, 1),
                rotate: val(10, 0, 'deg'),
            }),
        },
        2000,
        easeOutElastic,
    ),
    set({ backgroundColor: ['black', 'navy'] }),
    delay(1000),
    fromTo({ paddingBottom: val(0, 100, 'px') }, 2000),
])

const animationB = animate('#b', [
    fromTo({ paddingBottom: val(0, 100, 'px') }, 1000, easeOutElastic),
    set({ fontWeight: ['bold', 'normal'] }),
    fromTo(
        {
            paddingTop: val(0, 100, 'px'),
            paddingBottom: val(100, 0, 'px'),
        },
        1000,
    ),
])

const fadeIn = animate('main', [fromTo({ opacity: val(0, 1) }, 500)])
const fadeOut = animate('main', [fromTo({ opacity: val(1, 0) }, 500)])

const psychoBG = animate('#b', [
    fromTo({ backgroundColor: color('#FF0000', '#00FF00') }, 3000),
    fromTo({ backgroundColor: color('#00FF00', '#0000FF') }, 3000),
    fromTo({ backgroundColor: color('#0000FF', '#FF0000') }, 3000),
])

const animation = sequence([
    fadeIn,
    parallel([psychoBG, animationA, animationB]),
    fadeOut,
])

const anim = lightning(animation, {
    onComplete() {
        console.log('onComplete')
        // anim.play()
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
    seekEl.value = '0'
})
