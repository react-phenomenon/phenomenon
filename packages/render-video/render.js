#!/usr/bin/env node

/* eslint-disable no-undef, no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const puppeteer = require('puppeteer')
const ffmpeg = require('fluent-ffmpeg')
const path = require('path')
const fs = require('fs')
const prettyMs = require('pretty-ms')

const fps = 60

const config = {
    url: 'http://localhost:3000',
    viewport: { width: 1920, height: 1080 },
    step: 1000 / fps,
    output: 'video.mp4',
}

const formatMs = ms => prettyMs(ms, { compact: true })

const currentDateTime = new Date()
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ')

const dir = path.resolve(__dirname, `video-render ${currentDateTime}`)

const outputFilePath = frame => {
    const fr = frame.toString().padStart(5, '0')
    return path.resolve(dir, `frame_${fr}.png`)
}

const deleteFolderRecursive = p => {
    if (!fs.existsSync(p)) return
    fs.readdirSync(p).forEach(file => {
        const curPath = path.resolve(p, file)
        if (fs.lstatSync(curPath).isDirectory()) {
            deleteFolderRecursive(curPath)
        } else {
            fs.unlinkSync(curPath)
        }
    })
    fs.rmdirSync(p)
}

const main = async () => {
    console.log(`Starting browser`)

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.evaluateOnNewDocument(() => {
        window.__RENDER__ = true
    })
    await page.setViewport(config.viewport)

    console.log(`Url: ${config.url}`)

    try {
        await page.goto(config.url)
    } catch (e) {
        console.error(`Unable to load, start your presentation first (npm start)`)
        process.exit()
    }

    const durationEl = await page.waitForSelector('#duration')
    const duration = await page.evaluate(el => el.textContent, durationEl)

    console.log(`Slides duration: ${duration / 1000}s`)

    const framesCount = Math.round(duration / config.step)

    console.log(`${framesCount} frames`)

    fs.mkdirSync(dir)

    console.log(`Output dir ${dir}`)

    for (let frame = 0; frame <= framesCount; frame++) {
        const startMs = new Date()

        await page.evaluate(offset => {
            window.__TIMELINE.seek(offset)
        }, frame * config.step)

        await page.screenshot({ path: outputFilePath(frame) })

        const endMs = new Date() - startMs
        const leftTime = formatMs(endMs * (framesCount - frame))
        const percent = Math.round((frame / framesCount) * 100)

        process.stdout.write(`Rendering… ${percent}% ${leftTime} left\r`)
    }

    await browser.close()

    console.log(`Converting PNG files to video`)

    await ffmpeg()
        .videoBitrate('2048k')
        .videoCodec('libx264')
        .outputFPS(fps)
        .size('1920x1080')
        .autoPad()
        .addInput(`${dir}/frame_%05d.png`)
        .inputFps(fps)
        .save(`${dir}/${config.output}`)
        .on('end', () => {
            console.log('Render done!')
            console.log(`File: ${dir}/${config.output}`)
        })
}

main()
