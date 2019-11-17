const minIndent = (code: string) => {
    const match = code.match(/^[ \t]*(?=\S)/gm)

    if (!match) return 0

    return Math.min(...match.map((x: string) => x.length))
}

const emptyLineRegex = /^\s*/

const removeWhitespaceEdges = (code: string) => {
    const lines = code.split('\n')

    if (lines.length <= 1) {
        return code
    }

    const firstLine = lines[0]
    const lastLine = lines[lines.length - 1]

    if (emptyLineRegex.test(firstLine)) {
        lines.shift()
    }

    if (emptyLineRegex.test(lastLine)) {
        lines.pop()
    }

    return lines.join('\n')
}

export const stripIndent = (code: string) => {
    const indent = minIndent(code)

    if (indent === 0) return code

    const indentReg = new RegExp(`^[ \\t]{${indent}}`, 'gm')

    let newCode = code.replace(indentReg, '')
    newCode = removeWhitespaceEdges(newCode)

    return newCode
}
