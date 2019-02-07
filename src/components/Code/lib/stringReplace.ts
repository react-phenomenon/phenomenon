export const stringReplace = <T>(string: string, regexp: RegExp, fn: (id: string) => T) => {
    const output = []

    const storedLastIndex = regexp.lastIndex
    regexp.lastIndex = 0

    let result
    let lastIndex = 0

    while ((result = regexp.exec(string))) {
        const index = result.index

        if (result[0] === '') {
            // When the regexp is an empty string
            // we still want to advance our cursor to the next item.
            // This is the behavior of String.replace.
            regexp.lastIndex = regexp.lastIndex + 1
        }

        if (index !== lastIndex) {
            output.push(string.substring(lastIndex, index))
        }

        const match = result[0]
        lastIndex = index + match.length
        const id = result[1]

        const out = fn(id)
        output.push(out)

        if (!regexp.global) {
            break
        }
    }

    if (lastIndex < string.length) {
        output.push(string.substring(lastIndex))
    }

    regexp.lastIndex = storedLastIndex

    return output
}
