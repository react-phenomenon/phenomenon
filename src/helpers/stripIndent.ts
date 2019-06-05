const minIndent = (code: string) => {
    const match = code.match(/^[ \t]*(?=\S)/gm)

    if (!match) return 0

    return Math.min(...match.map((x: string) => x.length))
}

export const stripIndent = (code: string) => {
    const indent = minIndent(code)

    if (indent === 0) return code

    const reg = new RegExp(`^[ \\t]{${indent}}`, 'gm')

    return code.replace(reg, '').trim()
}
