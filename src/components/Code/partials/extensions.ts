const react = 'https://icongr.am/devicon/react-original.svg'

const extensions = {
    '.html': 'https://icongr.am/devicon/html5-original.svg',
    '.css': 'https://icongr.am/devicon/css3-original.svg',
    '.js': 'https://icongr.am/devicon/javascript-original.svg',
    '.ts': 'https://icongr.am/devicon/typescript-original.svg',
    '.jsx': react,
    '.tsx': react,
    'package.json': 'https://icongr.am/devicon/npm-original-wordmark.svg',
}

type ExtensionsKey = keyof typeof extensions

export const getExtensionsIcon = (name: string) => {
    const key = Object.keys(extensions).find(key => name.endsWith(key))
    if (!key) return
    return extensions[key as ExtensionsKey]
}
