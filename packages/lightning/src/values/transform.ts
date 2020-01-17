type Value = (n: number) => string | number

interface TransformValues {
    x?: Value
    y?: Value
    rotate?: Value
    scale?: Value
    skewX?: Value
    skewY?: Value
}

const zero = () => 0

export const transform = (values: TransformValues) => (n: number): string => {
    const val = []

    if ('x' in values || 'y' in values) {
        const { x = zero, y = zero } = values
        val.push(`translate(${x(n)}, ${y(n)})`)
    }

    if ('rotate' in values) {
        val.push(`rotate(${values.rotate!(n)})`)
    }

    if ('scale' in values) {
        val.push(`scale(${values.scale!(n)})`)
    }

    if ('skewX' in values) {
        val.push(`skewX(${values.skewX!(n)})`)
    }

    if ('skewY' in values) {
        val.push(`skewY(${values.skewY!(n)})`)
    }

    return val.join(' ')
}
