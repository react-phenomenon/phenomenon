import { createContext } from 'react'
import { stringReplace } from '../../../helpers/stringReplace'
import { highlightCode } from '../../../helpers/highlightCode'
import { Fragments } from '../types/Fragments'

const ID_REGEXP = /\n?\$([A-Z0-9_]*)\n?/g // $SOME

export const FragmentsProvider = createContext<Fragments>({})

export const appendFragments = (code: string, fragments: Fragments) => {
    const elements = stringReplace(code, ID_REGEXP, id => fragments[id])

    const newCode = elements.map((item, index) => {
        const next = elements[index + 1]

        // Next element has display: block so we have to remove new line
        if (
            typeof item === 'string' &&
            next &&
            typeof next === 'object' &&
            !next.inline
        ) {
            return item.trimRight()
        }

        if (typeof item === 'string') {
            return item
        }

        return item.element
    })

    return highlightCode(newCode)
}
