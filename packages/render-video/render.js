#!/usr/bin/env node

/* eslint-disable no-undef, no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const puppeteer = require('puppeteer')
const ffmpeg = require('fluent-ffmpeg')
const path = require('path')
const fs = require('fs')
const prettyMs = require('pretty-ms')
const { program } = require('@caporal/core')
const package = require('./package.json')

const formatMs = ms => prettyMs(ms, { compact: true })

const tmpDir = path.resolve(process.cwd(), `tmp-video-render-frames`)

const outputFilePath = frame => {
    const fr = frame.toString().padStart(5, '0')
    return path.resolve(tmpDir, `frame_${fr}.png`)
}

const deleteFolderRecursive = dir => {
    if (!fs.existsSync(dir)) return
    fs.readdirSync(dir).forEach(file => {
        const curPath = path.resolve(dir, file)
        if (fs.lstatSync(curPath).isDirectory()) {
            deleteFolderRecursive(curPath)
        } else {
            fs.unlinkSync(curPath)
        }
    })
    fs.rmdirSync(dir)
}

const main = async ({ width, height, fps, url, output, codec, bitrate }) => {
    console.log(`Starting render…`)

    console.log(`Url: ${url}`)
    console.log(`Resolution: ${width}x${height}`)
    console.log(`FPS: ${fps}`)

    const step = 1000 / fps

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.evaluateOnNewDocument(() => {
        window.__RENDER__ = true
    })
    await page.setViewport({ width, height })

    try {
        await page.goto(url)
    } catch (e) {
        console.error(`Unable to load, start your presentation first (npm start)`)
        process.exit()
    }

    const durationEl = await page.waitForSelector('#duration')
    const duration = await page.evaluate(el => el.textContent, durationEl)

    console.log(`Slides duration: ${duration / 1000}s`)

    const framesCount = Math.round(duration / step)

    console.log(`${framesCount} frames`)

    if (fs.existsSync(tmpDir)) deleteFolderRecursive(tmpDir)
    fs.mkdirSync(tmpDir)

    console.log(`Output dir ${tmpDir}`)

    for (let frame = 0; frame <= framesCount; frame++) {
        const startMs = new Date()

        await page.evaluate(offset => {
            window.__TIMELINE.seek(offset)
        }, frame * step)

        await page.screenshot({ path: outputFilePath(frame) })

        const endMs = new Date() - startMs
        const leftTime = formatMs(endMs * (framesCount - frame))
        const percent = Math.round((frame / framesCount) * 100)

        process.stdout.write(`Rendering… ${percent}% ${leftTime} left\r`)
    }

    await browser.close()

    console.log(`Converting PNG files to video`)

    await ffmpeg()
        .videoBitrate(bitrate)
        .videoCodec(codec)
        .outputFPS(fps)
        .size(`${width}x${height}`)
        .autoPad()
        .addInput(`${tmpDir}/frame_%05d.png`)
        .inputFps(fps)
        .save(`${output}`)
        .on('end', () => {
            console.log('Render done!')
            console.log(`Video file: ${output}`)
        })
}

program
    .version(package.version)
    .option('-f, --fps <fps>', 'Frames per second', { default: 60 })
    .option('-r, --resolution <resolution>', 'Video resolution eg. 1920x1080', {
        default: '1920x1080',
    })
    .option('--url <url>', 'Presentation server url', {
        default: 'http://localhost:3000',
    })
    .option('-o, --output <output>', 'Output file name', { default: 'video.mp4' })
    .option('--codec <codec>', 'Video codec', { default: 'libx264' })
    .option('--bitrate <bitrate>', 'Video bitrate', { default: '2048k' })
    .action(({ logger, options }) => {
        const [width, height] = options.resolution
            .split('x')
            .map(val => Number.parseInt(val))

        if (!width || !height) {
            logger.error('Invalid resolution')
            process.exit(1)
        }

        main({ width, height, ...options })
    })

program.run()
