import { FramesFunction } from '../types'
export const parallel = (frames: FramesFunction[]): FramesFunction => startAt =>
    frames.flatMap(frameFn => frameFn(startAt))
