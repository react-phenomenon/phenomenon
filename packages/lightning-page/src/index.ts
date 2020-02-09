/* eslint-disable no-console */
import {
    lightning,
    animate,
    fromTo,
    set,
    delay,
    pause,
    sequence,
    parallel,
    cascade,
    val,
    color,
    transform,
    inspector,
    text,
} from '@phenomenon/lightning'

const aFrames = animate('#a', [
    fromTo(
        {
            transform: transform({
                y: val(-200, 0, 'px'),
                scale: val(0.9, 1),
                rotate: val(10, 0, 'deg'),
            }),
        },
        1500,
    ),
    pause(),
    set({ backgroundColor: ['black', 'navy'] }),
    pause(),
    delay(500),
    fromTo({ paddingBottom: val(0, 100, 'px') }, 1000),
])

const bFrames = animate('#b', [
    fromTo(
        {
            paddingBottom: val(0, 100, 'px'),
            text: text('Hello world!'),
        },
        1000,
    ),
    set({ fontWeight: ['bold', 'normal'] }),
    fromTo(
        {
            paddingTop: val(0, 100, 'px'),
            paddingBottom: val(100, 0, 'px'),
        },
        1000,
    ),
])

const mainFadeInFrames = animate('main', [fromTo({ opacity: val(0, 1) }, 500)])
const mainFadeOutFrames = animate('main', [fromTo({ opacity: val(1, 0) }, 500)])

const bgFrames = animate('#b', [
    fromTo({ backgroundColor: color('rgba(255,0,0,0.1)', '#00FF00') }, 1500),
    fromTo({ backgroundColor: color('#00FF00', 'rgb(0,0,255)') }, 1500),
    fromTo({ backgroundColor: color('#0000FF', '#FF0000') }, 1500),
])

const getFadeInFrames = (selector: string) =>
    animate(selector, [fromTo({ opacity: val(0, 1) }, 500)])

const cascadeFrames = cascade(
    [
        getFadeInFrames('#e1'),
        getFadeInFrames('#e2'),
        getFadeInFrames('#e3'),
        getFadeInFrames('#e4'),
        getFadeInFrames('#e5'),
    ],
    { offset: i => i * 100 },
)

const frames = sequence([
    mainFadeInFrames,
    cascadeFrames,
    parallel([bgFrames, aFrames, bFrames]),
    pause(),
    mainFadeOutFrames,
])

const anim = lightning(frames, {
    onPlay() {
        console.log('onPlay')
    },
    onComplete() {
        console.log('onComplete')
    },
    onPause() {
        console.log('onPause')
    },
    onUpdate() {
        const { currentTime } = anim.getStatus()
        seekEl.value = currentTime.toString()
    },
})

inspector(anim)

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

document.addEventListener('keydown', ({ key }) => {
    switch (key) {
        case ' ': {
            const { playing } = anim.getStatus()
            playing ? anim.pause() : anim.play()

            break
        }

        case 'Home': {
            anim.seek(0)
            break
        }

        case 'ArrowRight':
        case 'ArrowLeft': {
            const { currentTime } = anim.getStatus()
            const offset = key === 'ArrowLeft' ? -1000 : 1000
            anim.seek(currentTime + offset)
            break
        }
    }

    console.log('key', key)
})
